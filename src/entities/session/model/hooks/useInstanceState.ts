import { useQuery } from '@tanstack/react-query'
import { instanceStateQueryOptions } from '../queries/SessionQueries'
import type { Credentials } from '../types'

export function useInstanceState(
  credentials: Credentials | undefined,
  enabled = true,
  pollingEnabled = true,
) {
  return useQuery(instanceStateQueryOptions(credentials, enabled, pollingEnabled))
}
