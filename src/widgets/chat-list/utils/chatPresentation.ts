import type { Index } from '../../../entities/chat'

const avatarGradients = ['red', 'orange', 'green', 'blue', 'purple'] as const

export function getChatName(chat: Pick<Index, 'id' | 'name'>) {
  return chat.name.trim() || chat.id
}

export function getChatSubtitle(chat: Pick<Index, 'archive' | 'id' | 'type'>) {
  if (chat.archive) {
    return 'В архиве'
  }

  if (chat.type === 'group') {
    return 'Группа'
  }

  return chat.id
}

export function getChatAvatarGradient(name: string) {
  const hash = Array.from(name).reduce((result, character) => result + character.charCodeAt(0), 0)

  return avatarGradients[hash % avatarGradients.length]
}
