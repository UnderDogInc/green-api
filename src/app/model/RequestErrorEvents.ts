import { getApiErrorMessage } from '../../shared/api'

type RequestErrorListener = (message: string) => void

const listeners = new Set<RequestErrorListener>()

export function emitRequestError(error: unknown) {
  const message = getApiErrorMessage(error)
  listeners.forEach((listener) => listener(message))
}

export function subscribeRequestErrors(listener: RequestErrorListener) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}
