export function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (!digits) {
    return ''
  }

  if (digits.startsWith('8')) {
    return `7${digits.slice(1)}`
  }
  if (digits.startsWith('7')) {
    return digits
  }

  return `7${digits}`
}

export function formatPhone(value: string): string {
  const phone = normalizePhone(value)

  if (!phone) {
    return ''
  }

  const rest = phone.slice(1)

  return (
    ['+7', rest.slice(0, 3), rest.length > 3 ? rest.slice(3, 6) : ''].filter(Boolean).join(' ') +
    (rest.length > 6 ? `-${rest.slice(6, 8)}` : '') +
    (rest.length > 8 ? `-${rest.slice(8, 10)}` : '')
  )
}
