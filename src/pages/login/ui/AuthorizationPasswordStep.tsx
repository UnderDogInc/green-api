import { Button } from '@maxhub/max-ui'
import { AuthorizationPasswordForm } from '../../../features/submit-telegram-authorization-password'
import type { Credentials } from '../../../entities/session'

interface Props {
  credentials: Credentials
  onAuthorized: () => void
  onCancel: () => void
}

export function AuthorizationPasswordStep({ credentials, onAuthorized, onCancel }: Props) {
  return (
    <div className="grid gap-5">
      <AuthorizationPasswordForm credentials={credentials} onAuthorized={onAuthorized} />
      <Button variant="secondary" stretched onClick={onCancel}>
        Вернуться к способу входа
      </Button>
    </div>
  )
}
