import { ApiError } from './ApiError'
import { getGreenApiUrl } from './GreenApiUrl'
import type { GreenApiMethod } from './GreenApiUrl'
import type { GreenApiCredentials } from './GreenApiCredentials'

type ApiFetchOptions = Omit<RequestInit, 'body'> & { body?: unknown }

async function apiFetch(url: string, options: ApiFetchOptions = {}): Promise<unknown> {
  const headers = new Headers(options.headers)
  const body = options.body

  if (body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(url, {
    ...options,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  if (!response.ok) {
    throw new ApiError(response.status)
  }

  const text = await response.text()
  return text.trim() ? (JSON.parse(text) as unknown) : null
}

export function greenApiGet(
  credentials: GreenApiCredentials,
  method: GreenApiMethod,
  signal?: AbortSignal,
  searchParams?: Record<string, string>,
): Promise<unknown> {
  const url = new URL(
    getGreenApiUrl(
      credentials.apiUrl,
      credentials.idInstance,
      credentials.apiTokenInstance,
      method,
    ),
  )

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      url.searchParams.set(key, value)
    }
  }

  return apiFetch(url.toString(), { method: 'GET', signal })
}

export function greenApiPost(
  credentials: GreenApiCredentials,
  method: GreenApiMethod,
  body: unknown,
  signal?: AbortSignal,
): Promise<unknown> {
  return apiFetch(
    getGreenApiUrl(
      credentials.apiUrl,
      credentials.idInstance,
      credentials.apiTokenInstance,
      method,
    ),
    { method: 'POST', body, signal },
  )
}

export function greenApiDelete(
  credentials: GreenApiCredentials,
  method: GreenApiMethod,
  pathParameter: string | number,
  signal?: AbortSignal,
): Promise<unknown> {
  const url = `${getGreenApiUrl(
    credentials.apiUrl,
    credentials.idInstance,
    credentials.apiTokenInstance,
    method,
  )}/${encodeURIComponent(String(pathParameter))}`

  return apiFetch(url, { method: 'DELETE', signal })
}
