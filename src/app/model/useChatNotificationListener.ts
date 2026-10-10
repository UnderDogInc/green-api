import { skipToken, useQuery, useQueryClient } from '@tanstack/react-query'
import type { GreenApiCredentials } from '../../shared/api'
import {
  CHAT_HISTORY_LIMIT,
  CHAT_LIST_LIMIT,
  chatKeys,
  deleteChatNotification,
  receiveChatNotification,
} from '../../entities/chat'
import type { ChatMessage, Index } from '../../entities/chat'
import { useSessionCredentials } from '../../entities/session'

export function useChatNotificationListener() {
  const credentials = useSessionCredentials()
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: chatKeys.notifications(credentials),
    queryFn: credentials
      ? ({ signal }) => listenForNotifications(credentials, signal, queryClient)
      : skipToken,
    enabled: Boolean(credentials),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: true,
    retryDelay: (attempt) => Math.min(1_000 * 2 ** attempt, 20_000),
  })
}

async function listenForNotifications(
  credentials: GreenApiCredentials,
  signal: AbortSignal,
  queryClient: ReturnType<typeof useQueryClient>,
) {
  while (!signal.aborted) {
    const notification = await receiveChatNotification(credentials, signal)

    if (!notification) {
      continue
    }

    if (notification.message) {
      addMessageToChatCache(queryClient, credentials, notification.message)
    }

    await deleteChatNotification(credentials, notification.receiptId, signal)
  }
}

function addMessageToChatCache(
  queryClient: ReturnType<typeof useQueryClient>,
  credentials: GreenApiCredentials,
  message: ChatMessage,
) {
  refreshChatListIfNeeded(queryClient, credentials, message)
  addMessageToHistory(queryClient, credentials, message)
}

function refreshChatListIfNeeded(
  queryClient: ReturnType<typeof useQueryClient>,
  credentials: GreenApiCredentials,
  message: ChatMessage,
) {
  const queryKey = chatKeys.list(credentials, CHAT_LIST_LIMIT)
  const chats = queryClient.getQueryData<Index[]>(queryKey)
  const chatExists = chats?.some((chat) => chat.id === message.chatId)

  if (chats && !chatExists) {
    void queryClient.invalidateQueries({ queryKey, exact: true })
  }
}

function addMessageToHistory(
  queryClient: ReturnType<typeof useQueryClient>,
  credentials: GreenApiCredentials,
  message: ChatMessage,
) {
  const queryKey = chatKeys.history(credentials, message.chatId, CHAT_HISTORY_LIMIT)
  const messages = queryClient.getQueryData<ChatMessage[]>(queryKey)

  if (!messages) {
    void queryClient.invalidateQueries({ queryKey, exact: true })
    return
  }

  const alreadyAdded = messages.some((item) => item.idMessage === message.idMessage)

  if (alreadyAdded) {
    return
  }

  queryClient.setQueryData<ChatMessage[]>(queryKey, [...messages, message].sort(byTimestamp))
}

function byTimestamp(first: ChatMessage, second: ChatMessage) {
  return first.timestamp - second.timestamp
}
