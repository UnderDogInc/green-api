const qrErrorMessages: Record<string, string> = {
  timeout: 'Время ожидания QR-кода истекло.',
  not_ready: 'Инстанс ещё не готов. Повторите запрос через несколько секунд.',
  connection_closed: 'Соединение закрыто. Запросите QR-код повторно.',
}

export function getQrErrorMessage(reason: string) {
  return qrErrorMessages[reason] ?? `Не удалось получить QR-код: ${reason}`
}
