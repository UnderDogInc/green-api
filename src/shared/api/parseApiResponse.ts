import type { GreenApiMethod } from './GreenApiUrl'

export function parseApiResponse<T>(
  value: unknown,
  isValid: (value: unknown) => value is T,
  method: GreenApiMethod,
): T {
  if (!isValid(value)) {
    throw new Error(`Green-API вернул некорректный ответ метода ${method}.`)
  }

  return value
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
