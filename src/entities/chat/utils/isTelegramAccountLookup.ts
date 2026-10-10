import { isRecord } from '../../../shared/api'
import type { TelegramAccountLookup } from '../types'

export function isTelegramAccountLookup(value: unknown): value is TelegramAccountLookup {
  return isRecord(value) && typeof value.exist === 'boolean' && typeof value.chatId === 'string'
}
