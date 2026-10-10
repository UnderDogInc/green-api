import type { Credentials } from '../../../entities/session'
import { usePhoneAuthorizationForm } from '../model/usePhoneAuthorizationForm'
import { PhoneAuthorizationContext } from '../model/PhoneAuthorizationContext'
import { AuthorizationCodeStep } from './AuthorizationCodeStep'
import { PhoneNumberStep } from './PhoneNumberStep'
interface Props {
  credentials: Credentials
  onPasswordRequired: () => void
  onAuthorized: () => void
}

export function PhoneAuthorizationContent({
  credentials,
  onPasswordRequired,
  onAuthorized,
}: Props) {
  const form = usePhoneAuthorizationForm({ credentials, onPasswordRequired, onAuthorized })

  return (
    <PhoneAuthorizationContext.Provider value={form}>
      {form.step === 'phone' ? <PhoneNumberStep /> : <AuthorizationCodeStep />}
      {form.notice && (
        <p className="m-0 text-sm leading-[1.45] text-[var(--text-secondary)]" role="status">
          {form.notice}
        </p>
      )}
      {form.error && (
        <p className="m-0 text-sm leading-[1.45] text-[#b42318]" role="alert">
          {form.error}
        </p>
      )}
    </PhoneAuthorizationContext.Provider>
  )
}
