import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '@reactuses/core'
import { useQueryClient } from '@tanstack/react-query'
import { InvalidCredentialsError } from '../api/SessionApi'
import { instanceStateQueryOptions } from './queries/SessionQueries'
import { AuthSessionContext } from './context'
import type { AuthSession, AuthSessionContextValue } from './types'
import {
  authSessionSerializer,
  readLegacySession,
  shouldClearAccountQueries,
  syncSessionCache,
  clearAccountQueries,
  sessionStorageKey,
  getSessionStatus,
} from './utils/session'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

export function AuthSessionProvider({ children, fallback = null }: Props) {
  const queryClient = useQueryClient()
  const [legacySession] = useState(readLegacySession)
  const [session, setStoredSession] = useLocalStorage<AuthSession | null>(
    sessionStorageKey,
    legacySession,
    { serializer: authSessionSerializer },
  )
  const [initialSession] = useState(() => session)
  const currentSession = useRef(session)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (shouldClearAccountQueries(currentSession.current, session)) {
      clearAccountQueries(queryClient)
      currentSession.current = session
    }
    syncSessionCache(queryClient, session)
  }, [queryClient, session])

  const setSession = useCallback<AuthSessionContextValue[1]>(
    (nextSession) => {
      if (shouldClearAccountQueries(currentSession.current, nextSession)) {
        clearAccountQueries(queryClient)
      }
      currentSession.current = nextSession
      setStoredSession(nextSession)
      syncSessionCache(queryClient, nextSession)
    },
    [queryClient, setStoredSession],
  )

  useEffect(() => {
    let cancelled = false

    async function validateInitialSession() {
      if (initialSession?.credentials) {
        try {
          const state = await queryClient.fetchQuery(
            instanceStateQueryOptions(initialSession.credentials, true, false),
          )
          const status = getSessionStatus(state.stateInstance)
          if (status && status !== initialSession.status) {
            setSession({ credentials: initialSession.credentials, status })
          }
        } catch (error) {
          if (error instanceof InvalidCredentialsError && initialSession.status === 'active') {
            setSession({ credentials: initialSession.credentials, status: 'pending' })
          }
        }
      }

      if (!cancelled) {
        setReady(true)
      }
    }

    void validateInitialSession()
    return () => {
      cancelled = true
    }
  }, [initialSession, queryClient, setSession])

  if (!ready) {
    return fallback
  }
  return (
    <AuthSessionContext.Provider value={[session, setSession]}>
      {children}
    </AuthSessionContext.Provider>
  )
}
