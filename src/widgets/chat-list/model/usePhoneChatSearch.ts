import { useState } from 'react'
import type { FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { formatPhone, isValidPhoneNumber, normalizePhoneNumber } from '../../../shared/helpers'
import { checkTelegramAccount } from '../../../entities/chat'
import { useSessionCredentials } from '../../../entities/session'
import { getApiErrorMessage } from '../../../shared/api'

export function usePhoneChatSearch() {
  const navigate = useNavigate()
  const credentials = useSessionCredentials()
  const accountLookup = useMutation({
    mutationKey: ['chats', 'lookup-phone'],
    meta: { errorDisplay: 'inline' },
    mutationFn: async (phoneNumber: number) => {
      if (!credentials) {
        throw new Error('Нет активной сессии Green-API.')
      }

      return checkTelegramAccount(credentials, phoneNumber)
    },
  })
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const inputValue = formatSearchPhone(phoneNumber)

  function updatePhoneNumber(value: string) {
    setPhoneNumber(value)
    setError('')
  }

  async function openChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const digits = normalizePhoneNumber(phoneNumber)

    if (!isValidPhoneNumber(digits)) {
      setError('Введите номер телефона с кодом страны.')

      return
    }

    setError('')

    try {
      const account = await accountLookup.mutateAsync(Number(digits))

      if (!account.exist || !account.chatId) {
        setError('Не удалось найти Telegram-аккаунт по этому номеру.')
        return
      }

      void navigate({
        to: '/$chatId',
        params: { chatId: account.chatId },
        search: { direct: false },
      })
    } catch (cause) {
      setError(getApiErrorMessage(cause))
    }
  }

  return {
    inputValue,
    phoneNumber,
    error,
    isPending: accountLookup.isPending,
    updatePhoneNumber,
    openChat,
  }
}

function formatSearchPhone(value: string) {
  const digits = normalizePhoneNumber(value)
  const isRussianPhone = digits.startsWith('7') || digits.startsWith('8')

  return isRussianPhone ? formatPhone(value) : value
}
