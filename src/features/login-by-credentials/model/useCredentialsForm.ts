import { useState } from 'react'
import type { FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  emptyCredentials,
  getCredentialsValidationError,
  getEnvironmentCredentials,
  getInstanceState,
  normalizeCredentials,
  useAuthSession,
} from '../../../entities/session'
import type { Credentials } from '../../../entities/session'
import { getApiErrorMessage } from '../../../shared/api'
import type { CredentialsAcceptedHandler } from './types'

export function useCredentialsForm({
  onCredentialsAccepted,
}: {
  onCredentialsAccepted: CredentialsAcceptedHandler
}) {
  const [session] = useAuthSession()
  const login = useMutation({
    mutationKey: ['session', 'login'],
    gcTime: 0,
    meta: { errorDisplay: 'inline' },
    mutationFn: ({ credentials }: { credentials: Credentials }) => getInstanceState(credentials),
  })
  const [credentials, setCredentials] = useState<Credentials>(
    () => session?.credentials ?? getEnvironmentCredentials() ?? emptyCredentials,
  )
  const [formError, setFormError] = useState('')

  function updateCredentials(field: keyof Credentials, value: string) {
    setCredentials((current) => ({ ...current, [field]: value }))
    setFormError('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextCredentials = normalizeCredentials(credentials)
    const validationError = getCredentialsValidationError(nextCredentials)

    if (validationError) {
      setFormError(validationError)
      return
    }

    try {
      const instanceState = await login.mutateAsync({ credentials: nextCredentials })
      onCredentialsAccepted(nextCredentials, instanceState)
    } catch (error) {
      setFormError(getApiErrorMessage(error))
    }
  }

  return {
    credentials,
    formError,
    isPending: login.isPending,
    updateCredentials,
    handleSubmit,
  }
}
