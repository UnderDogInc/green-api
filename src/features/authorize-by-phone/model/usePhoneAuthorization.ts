import { useMutation } from '@tanstack/react-query'
import {
  sendTelegramAuthorizationCode,
  startTelegramAuthorization,
} from '../../../entities/session'
import type { Credentials } from '../../../entities/session'

export function usePhoneAuthorization() {
  const start = useMutation({
    mutationKey: ['session', 'telegram-authorization', 'start'],
    meta: { errorDisplay: 'inline' },
    mutationFn: ({ credentials, phoneNumber }: { credentials: Credentials; phoneNumber: number }) =>
      startTelegramAuthorization(credentials, phoneNumber),
  })

  const verifyCode = useMutation({
    mutationKey: ['session', 'telegram-authorization', 'code'],
    meta: { errorDisplay: 'inline' },
    mutationFn: ({ credentials, code }: { credentials: Credentials; code: string }) =>
      sendTelegramAuthorizationCode(credentials, code),
  })

  return { start, verifyCode }
}
