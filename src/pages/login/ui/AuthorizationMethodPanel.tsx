import { QrAuthorizationPanel, QrAuthorizationContent } from '../../../features/auth-by-qr'
import {
  PhoneAuthorizationContent,
  PhoneAuthorizationPanel,
} from '../../../features/authorize-by-phone'
import type { Credentials } from '../../../entities/session'
import type { AuthMethod } from '../constants'

interface Props {
  method: AuthMethod
  credentials: Credentials
  qrEnabled: boolean
  onPasswordRequired: () => void
  onAuthorized: () => void
}

export function AuthorizationMethodPanel({
  method,
  credentials,
  qrEnabled,
  onPasswordRequired,
  onAuthorized,
}: Props) {
  if (method === 'qr') {
    return (
      <QrAuthorizationPanel>
        <QrAuthorizationContent credentials={credentials} enabled={qrEnabled} />
      </QrAuthorizationPanel>
    )
  }

  return (
    <PhoneAuthorizationPanel>
      <PhoneAuthorizationContent
        credentials={credentials}
        onPasswordRequired={onPasswordRequired}
        onAuthorized={onAuthorized}
      />
    </PhoneAuthorizationPanel>
  )
}
