import { Button, Input } from '@maxhub/max-ui'
import { usePhoneAuthorizationContext } from '../model/PhoneAuthorizationContext'
import { formatCountdown } from '../model/authorizationUtils'

export function AuthorizationCodeStep() {
  const form = usePhoneAuthorizationContext()

  return (
    <form className="grid gap-3" onSubmit={form.submitCode}>
      <Input
        inputMode="numeric"
        autoComplete="one-time-code"
        value={form.code}
        size="medium"
        onChange={(event) => form.setCode(event.currentTarget.value)}
        placeholder="Код из Telegram"
        aria-label="Код авторизации Telegram"
        required
      />
      <Button
        disabled={form.code.length < 4}
        type="submit"
        size="small"
        stretched
        loading={form.verifyPending}
      >
        Подтвердить код
      </Button>
      <Button
        type="button"
        size="small"
        variant="secondary"
        disabled={form.cooldownSeconds > 0 || form.startPending}
        loading={form.startPending}
        onClick={() => void form.requestCode()}
      >
        {form.cooldownSeconds > 0
          ? `Запросить код повторно через ${formatCountdown(form.cooldownSeconds)}`
          : 'Запросить код повторно'}
      </Button>
      <Button type="button" variant="secondary" size="small" onClick={form.editPhone}>
        Изменить номер
      </Button>
    </form>
  )
}
