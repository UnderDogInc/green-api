import { ApiError, greenApiGet, isRecord, parseApiResponse } from '../../../shared/api'
import type { Credentials, InstanceState, InstanceStateResponse, QrResponse } from '../model/types'
import type { AccountSettings } from '../model/types'

const instanceStates: readonly unknown[] = [
  'authorized',
  'notAuthorized',
  'pendingPassword',
  'blocked',
  'sleepMode',
  'starting',
  'yellowCard',
  'banned',
  'suspended',
] satisfies readonly InstanceState[]

export class InvalidCredentialsError extends ApiError {
  constructor() {
    super(401, 'Неверные креды')
    this.name = 'InvalidCredentialsError'
  }
}

async function getGreenApiJson<T>(
  credentials: Credentials,
  method: 'getStateInstance' | 'qr' | 'getAccountSettings' | 'logout',
  isValid: (value: unknown) => value is T,
  signal?: AbortSignal,
): Promise<T> {
  let response: unknown

  try {
    response = await greenApiGet(credentials, method, signal)
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      throw new InvalidCredentialsError()
    }

    throw error
  }

  return parseApiResponse(response, isValid, method)
}

export function getInstanceState(
  credentials: Credentials,
  signal?: AbortSignal,
): Promise<InstanceStateResponse> {
  return getGreenApiJson(credentials, 'getStateInstance', isInstanceStateResponse, signal)
}

export function getInstanceQr(credentials: Credentials, signal: AbortSignal): Promise<QrResponse> {
  return getGreenApiJson(credentials, 'qr', isQrResponse, signal)
}

export function getAccountSettings(
  credentials: Credentials,
  signal: AbortSignal,
): Promise<AccountSettings> {
  return getGreenApiJson(credentials, 'getAccountSettings', isAccountSettings, signal)
}

export async function logoutInstance(credentials: Credentials): Promise<void> {
  const response = await getGreenApiJson(credentials, 'logout', isLogoutResponse)

  if (!response.isLogout) {
    throw new Error('Green-API не смог разлогинить инстанс.')
  }
}

function isInstanceStateResponse(value: unknown): value is InstanceStateResponse {
  return isRecord(value) && instanceStates.includes(value.stateInstance)
}

function isQrResponse(value: unknown): value is QrResponse {
  return (
    isRecord(value) &&
    (value.type === 'qrCode' ||
      value.type === 'already_registered' ||
      value.type === 'alreadyLogged' ||
      value.type === 'error') &&
    typeof value.message === 'string'
  )
}

function isAccountSettings(value: unknown): value is AccountSettings {
  return (
    isRecord(value) &&
    typeof value.avatar === 'string' &&
    typeof value.phone === 'string' &&
    isInstanceStateResponse({ stateInstance: value.stateInstance }) &&
    typeof value.chatId === 'string' &&
    typeof value.username === 'string' &&
    typeof value.historySyncProgress === 'number' &&
    typeof value.logoutProcess === 'boolean'
  )
}

function isLogoutResponse(value: unknown): value is { isLogout: boolean } {
  return isRecord(value) && typeof value.isLogout === 'boolean'
}
