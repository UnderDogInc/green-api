import type { GreenApiCredentials } from '../../../shared/api'

export type Credentials = GreenApiCredentials

export type InstanceState =
  | 'authorized'
  | 'notAuthorized'
  | 'pendingPassword'
  | 'blocked'
  | 'sleepMode'
  | 'starting'
  | 'yellowCard'
  | 'banned'
  | 'suspended'

export type InstanceStateResponse = {
  stateInstance: InstanceState
}

export type QrResponse =
  | { type: 'qrCode'; message: string }
  | { type: 'already_registered'; message: string }
  | { type: 'alreadyLogged'; message: string }
  | { type: 'error'; message: string }

export type AccountSettings = {
  avatar: string
  phone: string
  stateInstance: InstanceState
  chatId: string
  username: string
  historySyncProgress: number
  logoutProcess: boolean
}

export type AuthSession = {
  credentials: Credentials
  status: AuthSessionStatus
}

export type AuthSessionStatus = 'active' | 'pending'

export type AuthSessionContextValue = readonly [
  AuthSession | null,
  (session: AuthSession | null) => void,
]
