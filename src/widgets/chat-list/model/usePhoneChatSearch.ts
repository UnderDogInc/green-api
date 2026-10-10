import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { formatPhone, isValidPhoneNumber, normalizePhoneNumber } from '../../../shared/helpers'

export function usePhoneChatSearch() {
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const inputValue = formatSearchPhone(phoneNumber)

  function updatePhoneNumber(value: string) {
    setPhoneNumber(value)
    setError('')
  }

  function openChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const digits = normalizePhoneNumber(phoneNumber)

    if (!isValidPhoneNumber(digits)) {
      setError('Введите номер телефона с кодом страны.')

      return
    }

    void navigate({
      to: '/$chatId',
      params: { chatId: `${digits}@c.us` },
      search: { direct: true },
    })
  }

  return { inputValue, phoneNumber, error, updatePhoneNumber, openChat }
}

function formatSearchPhone(value: string) {
  const digits = normalizePhoneNumber(value)
  const isRussianPhone = digits.startsWith('7') || digits.startsWith('8')

  return isRussianPhone ? formatPhone(value) : value
}
