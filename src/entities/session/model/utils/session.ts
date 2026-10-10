import type { QueryClient } from '@tanstack/react-query'
import { isRecord } from '../../../../shared/api'
import { getCredentialsValidationError } from './credentials'
import type { AuthSession, AuthSessionStatus, InstanceState } from '../types'
import { sessionKeys } from '../queries/SessionQueries'

export const sessionStorageKey = 'green-api-session'

function parseSession(raw: string | null): AuthSession | null {
  if (!raw) {
    return null
  }

  try {
    const value: unknown = JSON.parse(raw)

    if (!isAuthSession(value)) {
      return null
    }

    return value
  } catch {
    return null
  }
}

function isAuthSession(value: unknown): value is AuthSession {
  if (!isRecord(value) || (value.status !== 'active' && value.status !== 'pending')) {
    return false
  }

  const credentials = value.credentials
  if (
    !isRecord(credentials) ||
    typeof credentials.apiUrl !== 'string' ||
    typeof credentials.idInstance !== 'string' ||
    typeof credentials.apiTokenInstance !== 'string'
  ) {
    return false
  }

  return (
    getCredentialsValidationError({
      apiUrl: credentials.apiUrl,
      idInstance: credentials.idInstance,
      apiTokenInstance: credentials.apiTokenInstance,
    }) === null
  )
}

export function readLegacySession() {
  try {
    return parseSession(window.sessionStorage.getItem(sessionStorageKey))
  } catch {
    return null
  }
}

export const authSessionSerializer = {
  read: parseSession,
  write: (session: AuthSession | null) => JSON.stringify(session),
}

export function syncSessionCache(queryClient: QueryClient, session: AuthSession | null) {
  const credentials = session?.status === 'active' ? session.credentials : undefined

  if (credentials) {
    queryClient.setQueryData(sessionKeys.credentials, credentials)
  } else {
    queryClient.removeQueries({ queryKey: sessionKeys.credentials, exact: true })
  }
}

export function shouldClearAccountQueries(previous: AuthSession | null, next: AuthSession | null) {
  const sameCredentials =
    previous?.credentials.apiUrl === next?.credentials.apiUrl &&
    previous?.credentials.idInstance === next?.credentials.idInstance &&
    previous?.credentials.apiTokenInstance === next?.credentials.apiTokenInstance

  return !sameCredentials || previous?.status !== next?.status
}

export function getSessionStatus(state: InstanceState): AuthSessionStatus | undefined {
  if (state === 'authorized') {
    return 'active'
  }

  if (state === 'notAuthorized' || state === 'pendingPassword') {
    return 'pending'
  }
}

export function clearAccountQueries(queryClient: QueryClient) {
  queryClient.removeQueries({ queryKey: ['chats'] })
  queryClient.removeQueries({ queryKey: ['session'] })
}
