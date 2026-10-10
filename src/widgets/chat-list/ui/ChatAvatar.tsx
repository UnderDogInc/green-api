import { Avatar, Counter } from '@maxhub/max-ui'
import type { Index } from '../../../entities/chat'
import { getInitials } from '../../../shared/helpers'
import { getChatAvatarGradient, getChatName } from '../utils/chatPresentation'

export function ChatAvatar({ chat }: { chat: Index }) {
  const name = getChatName(chat)

  return (
    <span className="relative inline-flex h-12 w-12 shrink-0">
      <span className="block size-12 shrink-0 overflow-hidden rounded-full">
        <Avatar.Container size={48} form="circle">
          <Avatar.Text
            className="!justify-center !text-center !leading-none"
            gradient={getChatAvatarGradient(name)}
          >
            {getInitials(name)}
          </Avatar.Text>
        </Avatar.Container>
      </span>
      {chat.unreadCount > 0 && (
        <Counter
          className="absolute -top-1 -right-2 z-[1] min-w-5 justify-center"
          value={chat.unreadCount}
          variant="attention"
          aria-label={`${chat.unreadCount} непрочитанных`}
        />
      )}
    </span>
  )
}
