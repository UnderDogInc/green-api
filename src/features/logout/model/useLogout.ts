import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { logoutInstance, useAuthSession } from '../../../entities/session'

export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [session, setSession] = useAuthSession()

  const logoutMutation = useMutation({
    mutationKey: ['session', 'logout'],
    mutationFn: logoutInstance,
    meta: { errorDisplay: 'inline' },
  })

  function logout() {
    const confirmed = window.confirm('Выйти из аккаунта Green-API?')

    if (!confirmed) {
      return
    }

    if (!session || session.status !== 'active') {
      return
    }

    logoutMutation.mutate(session.credentials, {
      onSuccess: () => {
        queryClient.clear()
        setSession(null)
        void navigate({ to: '/login', search: { method: 'qr' }, replace: true })
      },
    })
  }

  return {
    logout,
    isPending: logoutMutation.isPending,
    hasError: logoutMutation.isError,
    error: logoutMutation.error,
  }
}
