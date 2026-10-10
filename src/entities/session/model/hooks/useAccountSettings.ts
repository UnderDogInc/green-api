import { useQuery } from '@tanstack/react-query'
import { accountSettingsQueryOptions } from '../queries/SessionQueries'
import { useSessionCredentials } from './useSessionCredentials'

export function useAccountSettings() {
  const credentials = useSessionCredentials()
  const accountQuery = useQuery(accountSettingsQueryOptions(credentials))

  return {
    ...accountQuery,
    credentials,
  }
}
