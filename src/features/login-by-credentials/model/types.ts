import type { Credentials, InstanceStateResponse } from '../../../entities/session'

export type CredentialsAcceptedHandler = (
  credentials: Credentials,
  state: InstanceStateResponse,
) => void

export type CredentialField = {
  key: keyof Credentials
  label: string
  type?: 'url' | 'password'
  autoComplete: 'url' | 'username' | 'current-password'
  placeholder?: string
  required?: boolean
}
