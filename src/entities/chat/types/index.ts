export type Index = {
  archive: boolean
  id: string
  name: string
  type: string
  unreadCount: number
}

export type ChatMessage = {
  idMessage: string
  timestamp: number
  type: 'incoming' | 'outgoing'
  typeMessage: string
  chatId: string
  textMessage?: string
  senderName?: string
  senderContactName?: string
  caption?: string
  downloadUrl?: string
  fileName?: string
}

export type ContactInfo = {
  avatar: string
  name: string
  contactName: string
  chatId: string
  chatType: string
  phoneNumber: string | number
  username: string
  description: string
  isPremium: boolean
  isVerified: boolean
  isScam: boolean
}

export type SendMessageResponse = {
  idMessage: string
}

export type ApiChat = {
  chatId: string
  name?: string
  type?: string
  archive?: boolean
  unreadCount?: number
}

export type ApiContactInfo = Partial<ContactInfo>
