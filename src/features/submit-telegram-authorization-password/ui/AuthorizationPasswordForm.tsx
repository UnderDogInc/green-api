import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button, Input, Typography } from '@maxhub/max-ui'
import { useMutation } from '@tanstack/react-query'
import type { Credentials } from '../../../entities/session'
import {
  getTelegramAuthorizationMessage,
  sendTelegramAuthorizationPassword,
} from '../../../entities/session'

interface Props {
  credentials: Credentials
  onAuthorized: () => void
}
export function AuthorizationPasswordForm({ credentials, onAuthorized }: Props) {
  const mutation = useMutation({
    mutationKey: ['session', 'telegram-authorization', 'password'],
    meta: { errorDisplay: 'inline' },
    mutationFn: ({ password }: { password: string }) =>
      sendTelegramAuthorizationPassword(credentials, password),
  })

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function submitPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    try {
      await mutation.mutateAsync({ password })
      onAuthorized()
    } catch (err) {
      setError(getTelegramAuthorizationMessage(err))
    }
  }

  return (
    <section className="grid gap-3">
      <Typography.Title>Пароль Telegram</Typography.Title>

      <Typography.Text color="secondary">
        На аккаунте включена двухфакторная защита. Укажите облачный пароль Telegram.
      </Typography.Text>

      <form className="grid gap-3" onSubmit={submitPassword}>
        <Input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          placeholder="Облачный пароль"
          aria-label="Облачный пароль Telegram"
          required
        />

        {error && (
          <p className="m-0 text-sm text-[#b42318]" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" stretched loading={mutation.isPending}>
          Завершить вход
        </Button>
      </form>
    </section>
  )
}
