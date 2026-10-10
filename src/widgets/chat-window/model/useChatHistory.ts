import { useQuery } from '@tanstack/react-query'
import { useSessionCredentials } from '../../../entities/session'
import { chatHistoryQueryOptions } from '../../../entities/chat'

export function useChatHistory(chatId: string) {
  const credentials = useSessionCredentials()
  return useQuery(chatHistoryQueryOptions(credentials, chatId))
}
