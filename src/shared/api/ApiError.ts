export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message = `Green-API request failed (${status})`,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        return 'Неверные данные доступа к Green-API. Проверьте ID и токен.'
      case 403:
        return 'Недостаточно прав для выполнения запроса.'
      case 404:
        return 'Запрошенные данные не найдены.'
      case 429:
        return 'Слишком много запросов. Попробуйте позже.'
      default:
        if (error.status >= 500) {
          return 'Сервис временно недоступен.'
        }
    }
  }

  if (error instanceof TypeError) {
    return 'Не удалось связаться с сервером. Проверьте подключение.'
  }

  return 'Не удалось выполнить запрос. Попробуйте ещё раз.'
}
