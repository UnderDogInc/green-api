import { Button, Input, Typography } from '@maxhub/max-ui'
import { useCredentialsForm } from '../model/useCredentialsForm'
import type { CredentialField, CredentialsAcceptedHandler } from '../model/types'

const credentialFields: readonly CredentialField[] = [
  {
    key: 'apiUrl',
    label: 'API URL',
    type: 'url',
    autoComplete: 'url',
    placeholder: 'URL из настроек инстанса',
  },
  { key: 'idInstance', label: 'ID инстанса', autoComplete: 'username', required: true },
  {
    key: 'apiTokenInstance',
    label: 'API token instance',
    type: 'password',
    autoComplete: 'current-password',
    required: true,
  },
]

export function CredentialsForm({
  onCredentialsAccepted,
}: {
  onCredentialsAccepted: CredentialsAcceptedHandler
}) {
  const form = useCredentialsForm({ onCredentialsAccepted })

  return (
    <form className="grid w-full gap-[18px]" onSubmit={form.handleSubmit}>
      <header className="grid gap-2">
        <Typography.Title>Вход в инстанс</Typography.Title>
        <Typography.Text color="secondary">
          Укажите данные GREEN-API. Дальше можно подтвердить Telegram через QR-код или номер
          телефона.
        </Typography.Text>
      </header>

      {credentialFields.map((field) => (
        <label key={field.key} className="grid gap-2">
          <Typography.Label>{field.label}</Typography.Label>
          <Input
            type={field.type}
            value={form.credentials[field.key]}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            onChange={(event) => form.updateCredentials(field.key, event.currentTarget.value)}
            required={field.required}
          />
        </label>
      ))}
      {form.formError && (
        <p className="m-0 text-sm leading-[1.45] text-[#b42318]" role="alert">
          {form.formError}
        </p>
      )}

      <Button type="submit" stretched loading={form.isPending}>
        {form.isPending ? 'Проверяем инстанс…' : 'Продолжить'}
      </Button>
    </form>
  )
}
