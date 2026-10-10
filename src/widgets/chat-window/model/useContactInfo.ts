import { useQuery } from '@tanstack/react-query'
import { useSessionCredentials } from '../../../entities/session'
import { contactInfoQueryOptions } from '../../../entities/chat'

export function useContactInfo(chatId: string, enabled = true) {
  const credentials = useSessionCredentials()
  return useQuery(contactInfoQueryOptions(credentials, chatId, enabled))
}
