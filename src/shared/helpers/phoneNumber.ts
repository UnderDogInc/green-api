export function normalizePhoneNumber(value: string) {
  return value.replace(/\D/g, '')
}

export function isValidPhoneNumber(value: string) {
  return value.length >= 7 && value.length <= 15
}
