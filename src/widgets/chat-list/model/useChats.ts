import { useQuery } from '@tanstack/react-query'
import { useSessionCredentials } from '../../../entities/session'
import { chatsQueryOptions } from '../../../entities/chat'

export function useChats() {
  const credentials = useSessionCredentials()
  return useQuery(chatsQueryOptions(credentials))
}
