import { Segmented } from '@maxhub/max-ui'
import type { Credentials } from '../../../entities/session'
import { AUTH_METHOD_ITEMS } from '../constants'
import type { AuthMethod } from '../constants'
import { AuthorizationMethodPanel } from './AuthorizationMethodPanel'
import { AuthorizationPasswordStep } from './AuthorizationPasswordStep'

interface Props {
  method: AuthMethod
  passwordRequired: boolean
  credentials: Credentials
  qrEnabled: boolean
  onMethodChange: (method: AuthMethod) => void
  onAuthorized: () => void
  onPasswordRequired: () => void
  onCancelPassword: () => void
}

export function LoginAuthorizationFlow({
  method,
  passwordRequired,
  credentials,
  qrEnabled,
  onMethodChange,
  onAuthorized,
  onPasswordRequired,
  onCancelPassword,
}: Props) {
  if (passwordRequired) {
    return (
      <AuthorizationPasswordStep
        credentials={credentials}
        onAuthorized={onAuthorized}
        onCancel={onCancelPassword}
      />
    )
  }

  return (
    <div className="grid gap-5">
      <Segmented
        items={AUTH_METHOD_ITEMS}
        activeItem={method}
        onClick={(id) => onMethodChange(id === 'phone' ? 'phone' : 'qr')}
      />
      <AuthorizationMethodPanel
        method={method}
        credentials={credentials}
        qrEnabled={qrEnabled}
        onPasswordRequired={onPasswordRequired}
        onAuthorized={onAuthorized}
      />
    </div>
  )
}
