import type { Credentials } from '../types'

export const emptyCredentials: Credentials = {
  apiUrl: '',
  idInstance: '',
  apiTokenInstance: '',
}

function isValidApiUrl(value: string) {
  try {
    const url = new URL(value)

    return url.protocol === 'https:'
  } catch {
    return false
  }
}

export function getEnvironmentCredentials(): Credentials | null {
  const credentials = {
    apiUrl: import.meta.env.VITE_API_URL ?? '',
    idInstance: import.meta.env.VITE_ID_INSTANCE ?? '',
    apiTokenInstance: import.meta.env.VITE_API_TOKEN ?? '',
  }

  return credentials.apiUrl && credentials.idInstance && credentials.apiTokenInstance
    ? credentials
    : null
}

export function normalizeCredentials(input: Credentials): Credentials {
  return {
    apiUrl: input.apiUrl.trim() || getEnvironmentCredentials()?.apiUrl || '',
    idInstance: input.idInstance.trim(),
    apiTokenInstance: input.apiTokenInstance.trim(),
  }
}

export function getCredentialsValidationError(credentials: Credentials): string | null {
  if (!isValidApiUrl(credentials.apiUrl)) {
    return 'Укажите корректный apiUrl из настроек своего инстанса.'
  }

  if (!credentials.idInstance || !credentials.apiTokenInstance) {
    return 'Укажите idInstance и apiTokenInstance.'
  }

  return null
}
