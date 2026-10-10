export const STALE_TIME_MS = 15_000
export const STALE_TIME_PED_MS = 20_000

export const STALE_TIME_ACC_MS = 60_000

export const REASON_MESSAGES: Record<string, string> = {
  already_registered: 'Этот инстанс уже авторизован.',
  system_busy: 'Инстанс уже ожидает код или пароль авторизации.',
  invalid_phone_number: 'Проверьте формат номера телефона.',
  blocked_or_deleted: 'Номер заблокирован или аккаунт Telegram удалён.',
  timeout_waiting_client: 'Telegram не ответил вовремя. Попробуйте позже.',
  connection_closed: 'Соединение с Telegram закрыто. Попробуйте позже.',
  verify_code_wrong: 'Неверный код авторизации.',
  code_expired: 'Срок действия кода истёк. Запросите новый код.',
  wrong_state_for_code: 'Сначала подтвердите код авторизации, затем отправьте облачный пароль.',
  authorization_not_started: 'Сначала запустите авторизацию инстанса.',
  timeout: 'Время ожидания ответа истекло. Попробуйте снова.',
  invalid_password: 'Неверный пароль Telegram.',
  '2fa_required': 'Код принят. Для завершения входа нужен облачный пароль Telegram.',
}
