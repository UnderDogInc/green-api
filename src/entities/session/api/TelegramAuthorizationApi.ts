import { greenApiPost, isRecord, parseApiResponse } from '../../../shared/api'
import type { GreenApiMethod } from '../../../shared/api'
import type { Credentials } from '../model/types'

export type TelegramAuthorizationReason = string

export class TelegramAuthorizationError extends Error {
  constructor(
    public readonly reason: TelegramAuthorizationReason,
    public readonly retryAfter?: number,
  ) {
    super(reason)
    this.name = 'TelegramAuthorizationError'
  }
}

type AuthorizationResponse = {
  status: boolean
  data: {
    status: 'success' | 'fail'
    reason?: string
    retryAfter?: number
  }
}

export async function startTelegramAuthorization(
  credentials: Credentials,
  phoneNumber: number,
): Promise<void> {
  const response = await postAuthorization(credentials, 'startAuthorization', { phoneNumber })
  ensureSuccess(response)
}

export async function sendTelegramAuthorizationCode(
  credentials: Credentials,
  code: string,
): Promise<'authorized' | 'password-required'> {
  const response = await postAuthorization(credentials, 'sendAuthorizationCode', { code })

  if (response.data.reason === '2fa_required') {
    return 'password-required'
  }
  ensureSuccess(response)
  return 'authorized'
}

export async function sendTelegramAuthorizationPassword(
  credentials: Credentials,
  password: string,
): Promise<void> {
  const response = await postAuthorization(credentials, 'sendAuthorizationPassword', { password })
  ensureSuccess(response)
}

async function postAuthorization(
  credentials: Credentials,
  method: Extract<
    GreenApiMethod,
    'startAuthorization' | 'sendAuthorizationCode' | 'sendAuthorizationPassword'
  >,
  body: Record<string, string | number>,
): Promise<AuthorizationResponse> {
  const response = await greenApiPost(credentials, method, body)
  return parseApiResponse(response, isAuthorizationResponse, method)
}

function ensureSuccess(response: AuthorizationResponse) {
  if (!response.status || response.data.status !== 'success') {
    throw new TelegramAuthorizationError(
      response.data.reason || 'unknown_error',
      response.data.retryAfter,
    )
  }
}

function isAuthorizationResponse(value: unknown): value is AuthorizationResponse {
  return (
    isRecord(value) &&
    typeof value.status === 'boolean' &&
    isRecord(value.data) &&
    (value.data.status === 'success' || value.data.status === 'fail') &&
    (value.data.reason === undefined || typeof value.data.reason === 'string') &&
    (value.data.retryAfter === undefined || typeof value.data.retryAfter === 'number')
  )
}
