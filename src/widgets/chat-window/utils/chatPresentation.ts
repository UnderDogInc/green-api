import type { ContactInfo } from '../../../entities/chat'

export function getContactDisplayName(
  chatId: string,
  direct: boolean,
  contact?: ContactInfo,
): string {
  return contact?.contactName || contact?.name || (direct ? chatId.replace(/@c\.us$/, '') : chatId)
}

export function getContactSubtitle(
  chatId: string,
  direct: boolean,
  contact: ContactInfo | undefined,
  hasError: boolean,
  displayName: string,
): string {
  if (direct) {
    return displayName
  }

  if (hasError) {
    return chatId
  }

  return contact?.username || String(contact?.phoneNumber ?? '')
}
