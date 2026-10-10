import { createContext, useContext } from 'react'
import type { usePhoneAuthorizationForm } from './usePhoneAuthorizationForm'

type PhoneAuthorizationFormState = ReturnType<typeof usePhoneAuthorizationForm>

export const PhoneAuthorizationContext = createContext<PhoneAuthorizationFormState | null>(null)

export function usePhoneAuthorizationContext() {
  const context = useContext(PhoneAuthorizationContext)

  if (!context) {
    throw new Error(
      'Компонент телефонной авторизации должен быть внутри PhoneAuthorizationContent.',
    )
  }

  return context
}
