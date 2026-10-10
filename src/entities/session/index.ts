export {
  getInstanceQr,
  getInstanceState,
  logoutInstance,
  InvalidCredentialsError,
  getAccountSettings,
} from './api/SessionApi'
export {
  sendTelegramAuthorizationCode,
  sendTelegramAuthorizationPassword,
  startTelegramAuthorization,
  TelegramAuthorizationError,
} from './api/TelegramAuthorizationApi'
export type { TelegramAuthorizationReason } from './api/TelegramAuthorizationApi'
export {
  getCredentialsValidationError,
  getEnvironmentCredentials,
  normalizeCredentials,
  emptyCredentials,
} from './model/utils/credentials'
export { getTelegramAuthorizationMessage } from './model/utils/telegramAuthorizationMessage'
export { AuthSessionProvider } from './model/AuthSessionProvider'
export { useAuthSession } from './model/hooks/useAuthSession'
export { useSessionCredentials } from './model/hooks/useSessionCredentials'
export { useAccountSettings } from './model/hooks/useAccountSettings'
export { useInstanceState } from './model/hooks/useInstanceState'
export {
  accountSettingsQueryOptions,
  instanceQrQueryOptions,
  instanceStateQueryOptions,
  sessionKeys,
} from './model/queries/SessionQueries'
export type {
  AccountSettings,
  AuthSession,
  AuthSessionStatus,
  Credentials,
  InstanceState,
  InstanceStateResponse,
  QrResponse,
} from './model/types'
