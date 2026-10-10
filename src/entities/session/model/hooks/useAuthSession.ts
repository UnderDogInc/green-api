import { useContext } from 'react'
import { AuthSessionContext } from '../context'

export function useAuthSession() {
  const context = useContext(AuthSessionContext)
  if (!context) {
    throw new Error('useAuthSession should  use with in AuthSessionProvider')
  }

  return context
}
