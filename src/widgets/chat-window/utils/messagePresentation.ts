import type { ChatMessage } from '../../../entities/chat'

export function getMessageContent(message: ChatMessage) {
  return message.textMessage || message.caption || message.fileName || `[${message.typeMessage}]`
}

export function getMessageDateTime(timestamp: number) {
  return new Date(timestamp * 1000).toISOString()
}

export function getMessageTime(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}
