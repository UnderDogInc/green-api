import { useEffect, useState } from 'react'
import { useRouter, useRouterState } from '@tanstack/react-router'
import {
  InvalidCredentialsError,
  useAuthSession,
  useInstanceState,
} from '../../../entities/session'
import type { Credentials, InstanceStateResponse } from '../../../entities/session'
import { useCompleteAuthorization } from '../../../features/login-by-credentials'
import { STATE_LABELS } from '../constants'
import type { AuthMethod } from '../constants'

export function useLoginPage() {
  const [session, setSession] = useAuthSession()
  const completeAuthorization = useCompleteAuthorization()
  const router = useRouter()
  const searchMethod = useRouterState({
    select: (state) => state.location.search.method,
  })
  const method: AuthMethod = searchMethod === 'phone' ? 'phone' : 'qr'
  const [passwordRequiredOverride, setPasswordRequiredOverride] = useState<boolean>()
  const [editingCredentials, setEditingCredentials] = useState(() => !session?.credentials)
  const credentials = session?.credentials
  const showCredentialsForm = editingCredentials || !credentials
  const shouldCheckInstanceState = Boolean(credentials) && !showCredentialsForm && method === 'qr'
  const instanceState = useInstanceState(
    credentials,
    shouldCheckInstanceState,
    shouldCheckInstanceState,
  )
  const passwordRequired =
    passwordRequiredOverride ?? instanceState.data?.stateInstance === 'pendingPassword'

  useEffect(() => {
    if (!credentials || showCredentialsForm || method !== 'qr') {
      return
    }

    if (instanceState.data?.stateInstance === 'authorized') {
      completeAuthorization(credentials)
      return
    }
  }, [
    completeAuthorization,
    credentials,
    instanceState.data?.stateInstance,
    method,
    showCredentialsForm,
  ])

  function handleAuthorized(nextCredentials: Credentials) {
    completeAuthorization(nextCredentials)
  }

  function handlePending(nextCredentials: Credentials, state: InstanceStateResponse) {
    setSession({ credentials: nextCredentials, status: 'pending' })
    setPasswordRequiredOverride(state.stateInstance === 'pendingPassword')
    setEditingCredentials(false)
  }

  function handleCredentialsAccepted(nextCredentials: Credentials, state: InstanceStateResponse) {
    if (state.stateInstance === 'authorized') {
      handleAuthorized(nextCredentials)
      return
    }

    handlePending(nextCredentials, state)
  }

  function changeInstance() {
    setPasswordRequiredOverride(undefined)
    setMethod('qr')
    setEditingCredentials(true)
  }

  function setMethod(nextMethod: AuthMethod) {
    void router.navigate({
      to: '/login',
      search: { method: nextMethod },
      replace: true,
    })
  }

  const hasInvalidCredentials = instanceState.error instanceof InvalidCredentialsError
  const statusMessage =
    instanceState.data?.stateInstance &&
    instanceState.data.stateInstance !== 'authorized' &&
    instanceState.data.stateInstance !== 'notAuthorized'
      ? STATE_LABELS[instanceState.data.stateInstance]
      : null

  return {
    credentials,
    method,
    setMethod,
    passwordRequired,
    showCredentialsForm,
    instanceState,
    statusMessage,
    hasInvalidCredentials,
    handleAuthorized,
    handleCredentialsAccepted,
    changeInstance,
    requestPassword: () => setPasswordRequiredOverride(true),
    cancelPassword: () => setPasswordRequiredOverride(false),
    retryState: () => void instanceState.refetch(),
  }
}
