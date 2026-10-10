import { Button, Input, Typography } from '@maxhub/max-ui'
import type { ChangeEvent } from 'react'
import { usePhoneAuthorizationContext } from '../model/PhoneAuthorizationContext'
import { formatCountdown } from '../model/authorizationUtils'
import { formatPhone, normalizePhone } from '../../../shared/helpers'

export function PhoneNumberStep() {
  const form = usePhoneAuthorizationContext()

  const phoneChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const rawPhone = normalizePhone(event.currentTarget.value)

    form.setPhoneNumber(rawPhone)
  }
  return (
    <form className="grid gap-3" onSubmit={form.submitPhone}>
      <Input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={formatPhone(form.phoneNumber)}
        size="medium"
        onChange={phoneChanged}
        placeholder="Ваш номер телефона"
        required
      />

      <Typography.Text color="secondary">
        Telegram может не отправить код из-за ограничений. Если код не приходит, попробуйте
        авторизацию по QR.{' '}
        <a
          href="https://green-api.com/telegram/docs/api/account/StartAuthorization/"
          target="_blank"
          rel="noreferrer"
        >
          Подробнее о запросе кода
        </a>
      </Typography.Text>

      <Button
        type="submit"
        stretched
        size="small"
        loading={form.startPending}
        disabled={form.startPending || form.cooldownSeconds > 0}
      >
        {form.cooldownSeconds > 0
          ? `Запросить код через ${formatCountdown(form.cooldownSeconds)}`
          : 'Запросить код'}
      </Button>
    </form>
  )
}
