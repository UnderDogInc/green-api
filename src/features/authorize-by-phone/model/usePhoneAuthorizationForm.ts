import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  getTelegramAuthorizationMessage,
  TelegramAuthorizationError,
} from '../../../entities/session'
import type { Credentials } from '../../../entities/session'
import { usePhoneAuthorization } from './usePhoneAuthorization'
import { isValidPhoneNumber, normalizePhoneNumber } from '../../../shared/helpers'
import { useAuthorizationCooldown } from './useAuthorizationCooldown'

export function usePhoneAuthorizationForm({
  credentials,
  onPasswordRequired,
  onAuthorized,
}: {
  credentials: Credentials
  onPasswordRequired: () => void
  onAuthorized: () => void
}) {
  const { start, verifyCode } = usePhoneAuthorization()
  const cooldown = useAuthorizationCooldown(credentials.idInstance)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'phone' | 'code'>('phone')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  async function requestCode() {
    setError('')
    setNotice('')

    const phone = normalizePhoneNumber(phoneNumber)
    if (!isValidPhoneNumber(phone)) {
      setError('Введите номер телефона с кодом страны.')
      return
    }

    try {
      await start.mutateAsync({ credentials, phoneNumber: Number(phone) })
      setStep('code')
      cooldown.start()
      setNotice(
        'Если Telegram отправит код, он придёт в системный чат. Код действует 5 минут. Повторный запрос доступен через минуту, но Telegram может ограничивать частоту отправки.',
      )
    } catch (cause) {
      if (cause instanceof TelegramAuthorizationError && cause.reason === 'already_registered') {
        onAuthorized()
      } else if (cause instanceof TelegramAuthorizationError && cause.reason === 'system_busy') {
        setStep('code')
        cooldown.start()
        setNotice('Инстанс уже ожидает код авторизации. Введите полученный код.')
      } else {
        setError(getTelegramAuthorizationMessage(cause))
      }
    }
  }

  async function submitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setNotice('')

    try {
      const result = await verifyCode.mutateAsync({ credentials, code: code.trim() })
      if (result === 'password-required') {
        onPasswordRequired()
      } else {
        onAuthorized()
      }
    } catch (cause) {
      setError(getTelegramAuthorizationMessage(cause))
    }
  }

  function submitPhone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void requestCode()
  }

  function editPhone() {
    setStep('phone')
    setCode('')
    setError('')
    setNotice('')
  }

  return {
    step,
    phoneNumber,
    setPhoneNumber,
    code,
    setCode,
    error,
    notice,
    cooldownSeconds: cooldown.seconds,
    startPending: start.isPending,
    verifyPending: verifyCode.isPending,
    submitPhone,
    submitCode,
    requestCode,
    editPhone,
  }
}
