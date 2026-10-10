import { useCallback } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthSession } from '../../../entities/session'
import type { Credentials } from '../../../entities/session'

export function useCompleteAuthorization() {
  const navigate = useNavigate()
  const [, setSession] = useAuthSession()

  return useCallback(
    (credentials: Credentials) => {
      setSession({ credentials, status: 'active' })
      void navigate({ to: '/', replace: true })
    },
    [navigate, setSession],
  )
}
