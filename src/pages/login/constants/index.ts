import type { InstanceState } from '../../../entities/session'

export type AuthMethod = 'qr' | 'phone'

export const STATE_LABELS: Record<InstanceState, string> = {
  authorized: 'Подключено',
  notAuthorized: 'Инстанс ожидает авторизации в Telegram',
  pendingPassword: 'Нужен облачный пароль Telegram',
  blocked: 'Инстанс заблокирован',
  sleepMode: 'Инстанс находится в режиме сна',
  starting: 'Инстанс запускается',
  yellowCard: 'Инстанс получил предупреждение',
  banned: 'Инстанс забанен',
  suspended: 'На аккаунте временные ограничения',
}

export const AUTH_METHOD_ITEMS: { id: AuthMethod; title: string }[] = [
  { id: 'qr', title: 'QR-код' },
  { id: 'phone', title: 'Телефон' },
]
