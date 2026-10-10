export type GreenApiMethod =
  | 'getStateInstance'
  | 'qr'
  | 'getAccountSettings'
  | 'getChats'
  | 'checkAccount'
  | 'getChatHistory'
  | 'getContactInfo'
  | 'receiveNotification'
  | 'deleteNotification'
  | 'sendMessage'
  | 'startAuthorization'
  | 'sendAuthorizationCode'
  | 'sendAuthorizationPassword'
  | 'logout'

export function getGreenApiUrl(
  apiUrl: string,
  idInstance: string,
  apiTokenInstance: string,
  method: GreenApiMethod,
) {
  const normalizedApiUrl = apiUrl.replace(/\/+$/, '')
  const encodedId = encodeURIComponent(idInstance)
  const encodedToken = encodeURIComponent(apiTokenInstance)

  return `${normalizedApiUrl}/waInstance${encodedId}/${method}/${encodedToken}`
}
