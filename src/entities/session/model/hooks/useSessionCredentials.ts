import { useAuthSession } from './useAuthSession'

export function useSessionCredentials() {
  const [session] = useAuthSession()
  return session?.status === 'active' ? session.credentials : undefined
}
