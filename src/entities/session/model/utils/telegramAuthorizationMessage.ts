import { ApiError, getApiErrorMessage } from '../../../../shared/api'
import { TelegramAuthorizationError } from '../../api/TelegramAuthorizationApi'
import { REASON_MESSAGES } from '../../constants'

export function getTelegramAuthorizationMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return getApiErrorMessage(error)
  }

  if (!(error instanceof TelegramAuthorizationError)) {
    return 'Не удалось связаться с Green-API. Проверьте адрес сервера и данные инстанса.'
  }

  if (error.reason === 'rate_limit_exceeded') {
    return error.retryAfter
      ? `Превышен лимит запросов. Повторите через ${Math.ceil(error.retryAfter / 1000)} сек.`
      : 'Превышен лимит запросов. Попробуйте позже.'
  }

  return REASON_MESSAGES[error.reason] ?? `Не удалось выполнить авторизацию: ${error.reason}.`
}
