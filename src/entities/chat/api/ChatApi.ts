import {
  greenApiDelete,
  greenApiGet,
  greenApiPost,
  isRecord,
  parseApiResponse,
} from '../../../shared/api'
import type { GreenApiCredentials } from '../../../shared/api'
import type {
  Index,
  ChatMessage,
  ContactInfo,
  SendMessageResponse,
  TelegramAccountLookup,
  ApiChat,
  ApiContactInfo,
} from '../types'
import { isTelegramAccountLookup } from '../utils/isTelegramAccountLookup'

const RECEIVE_TIMEOUT_SECONDS = '60'

type ReceivedNotification = {
  receiptId: number
  message: ChatMessage | null
}

export async function getChats(
  credentials: GreenApiCredentials,
  signal: AbortSignal,
  count: number,
): Promise<Index[]> {
  const response = await greenApiGet(credentials, 'getChats', signal, {
    count: String(count),
  })
  const chats = parseApiResponse(response, isApiChatList, 'getChats')

  return chats.map((chat) => ({
    id: chat.chatId,
    name: chat.name || chat.chatId,
    type: chat.type || 'user',
    archive: chat.archive ?? false,
    unreadCount: chat.unreadCount ?? 0,
  }))
}

export async function getChatHistory(
  credentials: GreenApiCredentials,
  signal: AbortSignal,
  chatId: string,
  count: number,
): Promise<ChatMessage[]> {
  const response = await greenApiPost(credentials, 'getChatHistory', { chatId, count }, signal)
  const messages = parseApiResponse(response, isChatMessageList, 'getChatHistory')

  return messages.sort((first, second) => first.timestamp - second.timestamp)
}

export async function getContactInfo(
  credentials: GreenApiCredentials,
  signal: AbortSignal,
  chatId: string,
): Promise<ContactInfo> {
  const rawResponse = await greenApiPost(credentials, 'getContactInfo', { chatId }, signal)
  const response = parseApiResponse(rawResponse, isApiContactInfo, 'getContactInfo')

  return {
    avatar: response.avatar ?? '',
    name: response.name ?? '',
    contactName: response.contactName ?? '',
    chatId: response.chatId ?? chatId,
    chatType: response.chatType ?? 'user',
    phoneNumber: response.phoneNumber ?? '',
    username: response.username ?? '',
    description: response.description ?? '',
    isPremium: response.isPremium ?? false,
    isVerified: response.isVerified ?? false,
    isScam: response.isScam ?? false,
  }
}

export async function checkTelegramAccount(
  credentials: GreenApiCredentials,
  phoneNumber: number,
): Promise<TelegramAccountLookup> {
  const response = await greenApiPost(credentials, 'checkAccount', { phoneNumber })

  return parseApiResponse(response, isTelegramAccountLookup, 'checkAccount')
}

export async function sendChatMessage(
  credentials: GreenApiCredentials,
  chatId: string,
  message: string,
): Promise<SendMessageResponse> {
  const response = await greenApiPost(credentials, 'sendMessage', { chatId, message })
  return parseApiResponse(response, isSendMessageResponse, 'sendMessage')
}

export async function receiveChatNotification(
  credentials: GreenApiCredentials,
  signal: AbortSignal,
): Promise<ReceivedNotification | null> {
  const response = await greenApiGet(credentials, 'receiveNotification', signal, {
    receiveTimeout: RECEIVE_TIMEOUT_SECONDS,
  })
  if (response === null) {
    return null
  }

  const notification = parseApiResponse(response, isReceivedNotification, 'receiveNotification')

  return {
    receiptId: notification.receiptId,
    message: toIncomingTextMessage(notification.body),
  }
}

export async function deleteChatNotification(
  credentials: GreenApiCredentials,
  receiptId: number,
  signal: AbortSignal,
): Promise<void> {
  const response = await greenApiDelete(credentials, 'deleteNotification', receiptId, signal)
  const result = parseApiResponse(response, isDeleteNotificationResponse, 'deleteNotification')

  if (!result.result) {
    throw new Error('Green-API не удалил обработанное уведомление.')
  }
}

function isReceivedNotification(value: unknown): value is { receiptId: number; body: unknown } {
  return isRecord(value) && typeof value.receiptId === 'number' && isRecord(value.body)
}

function isDeleteNotificationResponse(value: unknown): value is { result: boolean } {
  return isRecord(value) && typeof value.result === 'boolean'
}

function toIncomingTextMessage(body: unknown): ChatMessage | null {
  if (!isRecord(body) || body.typeWebhook !== 'incomingMessageReceived') {
    return null
  }

  const senderData = body.senderData
  const messageData = body.messageData
  if (!isRecord(senderData) || !isRecord(messageData)) {
    return null
  }

  const textMessageData = messageData.textMessageData
  if (
    messageData.typeMessage !== 'textMessage' ||
    !isRecord(textMessageData) ||
    typeof body.idMessage !== 'string' ||
    typeof body.timestamp !== 'number' ||
    typeof senderData.chatId !== 'string' ||
    typeof textMessageData.textMessage !== 'string'
  ) {
    return null
  }

  return {
    idMessage: body.idMessage,
    timestamp: body.timestamp,
    type: 'incoming',
    typeMessage: 'textMessage',
    chatId: senderData.chatId,
    textMessage: textMessageData.textMessage,
    ...(typeof senderData.senderName === 'string' && { senderName: senderData.senderName }),
    ...(typeof senderData.senderContactName === 'string' && {
      senderContactName: senderData.senderContactName,
    }),
  }
}

function isApiChatList(value: unknown): value is ApiChat[] {
  return Array.isArray(value) && value.every(isApiChat)
}

function isApiChat(value: unknown): value is ApiChat {
  return (
    isRecord(value) &&
    typeof value.chatId === 'string' &&
    (value.name === undefined || typeof value.name === 'string') &&
    (value.type === undefined || typeof value.type === 'string') &&
    (value.archive === undefined || typeof value.archive === 'boolean') &&
    (value.unreadCount === undefined || typeof value.unreadCount === 'number')
  )
}

function isChatMessageList(value: unknown): value is ChatMessage[] {
  return Array.isArray(value) && value.every(isChatMessage)
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (
    !isRecord(value) ||
    typeof value.idMessage !== 'string' ||
    typeof value.timestamp !== 'number' ||
    (value.type !== 'incoming' && value.type !== 'outgoing') ||
    typeof value.typeMessage !== 'string' ||
    typeof value.chatId !== 'string'
  ) {
    return false
  }

  const optionalTextFields = [
    'textMessage',
    'senderName',
    'senderContactName',
    'caption',
    'downloadUrl',
    'fileName',
  ] as const

  return optionalTextFields.every(
    (field) => value[field] === undefined || typeof value[field] === 'string',
  )
}

function isApiContactInfo(value: unknown): value is ApiContactInfo {
  if (!isRecord(value)) {
    return false
  }

  const textFields = [
    'avatar',
    'name',
    'contactName',
    'chatId',
    'chatType',
    'username',
    'description',
  ] as const
  const booleanFields = ['isPremium', 'isVerified', 'isScam'] as const

  return (
    textFields.every((field) => value[field] === undefined || typeof value[field] === 'string') &&
    booleanFields.every(
      (field) => value[field] === undefined || typeof value[field] === 'boolean',
    ) &&
    (value.phoneNumber === undefined ||
      typeof value.phoneNumber === 'string' ||
      typeof value.phoneNumber === 'number')
  )
}

function isSendMessageResponse(value: unknown): value is SendMessageResponse {
  return isRecord(value) && typeof value.idMessage === 'string'
}
