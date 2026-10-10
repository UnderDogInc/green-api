import { queryOptions, skipToken } from '@tanstack/react-query'
import {
  getInstanceQr,
  getInstanceState,
  getAccountSettings,
  InvalidCredentialsError,
} from '../../api/SessionApi'
import type { Credentials } from '../types'
import { STALE_TIME_ACC_MS, STALE_TIME_MS, STALE_TIME_PED_MS } from '../../constants'

export const sessionKeys = {
  credentials: ['session', 'credentials'] as const,
  state: (credentials?: Credentials) =>
    ['session', 'state', credentials?.apiUrl, credentials?.idInstance] as const,
  qr: (apiUrl: string, idInstance: string) => ['session', 'qr', apiUrl, idInstance] as const,
  accountSettings: (credentials?: Credentials) =>
    ['session', 'account-settings', credentials?.apiUrl, credentials?.idInstance] as const,
}

export const instanceStateQueryOptions = (
  credentials: Credentials | undefined,
  enabled = true,
  pollingEnabled = true,
) =>
  queryOptions({
    queryKey: sessionKeys.state(credentials),
    queryFn: credentials ? ({ signal }) => getInstanceState(credentials, signal) : skipToken,
    enabled,
    staleTime: STALE_TIME_MS,
    refetchInterval: (query) => {
      if (!pollingEnabled) {
        return false
      }

      if (query.state.error instanceof InvalidCredentialsError) {
        return false
      }

      return query.state.data?.stateInstance === 'authorized' ||
        query.state.data?.stateInstance === 'pendingPassword'
        ? false
        : STALE_TIME_PED_MS
    },
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    meta: { errorDisplay: 'inline' },
  })

export const instanceQrQueryOptions = (credentials: Credentials, enabled = true) =>
  queryOptions({
    queryKey: sessionKeys.qr(credentials.apiUrl, credentials.idInstance),
    queryFn: ({ signal }) => getInstanceQr(credentials, signal),
    enabled,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    meta: { errorDisplay: 'inline' },
  })

export const accountSettingsQueryOptions = (credentials?: Credentials) =>
  queryOptions({
    queryKey: sessionKeys.accountSettings(credentials),
    queryFn: credentials ? ({ signal }) => getAccountSettings(credentials, signal) : skipToken,
    staleTime: STALE_TIME_ACC_MS,
    meta: { errorDisplay: 'inline' },
  })
