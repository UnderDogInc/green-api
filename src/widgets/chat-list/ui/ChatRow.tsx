import { CellSimple } from '@maxhub/max-ui'
import { Link } from '@tanstack/react-router'
import type { Index } from '../../../entities/chat'
import { ChatAvatar } from './ChatAvatar'
import { getChatName, getChatSubtitle } from '../utils/chatPresentation'

export function ChatRow({ chat }: { chat: Index }) {
  const name = getChatName(chat)

  return (
    <Link
      to="/$chatId"
      params={{ chatId: chat.id }}
      search={{ direct: false }}
      className="group block w-full rounded-lg text-inherit no-underline"
      activeProps={{ className: 'bg-[var(--background-tertiary)]' }}
    >
      <CellSimple
        className="w-full min-w-0 cursor-pointer rounded-lg transition-colors duration-150 group-hover:bg-[var(--states-background-hovered-transparent)] group-active:bg-[var(--background-tertiary)]"
        title={name}
        subtitle={getChatSubtitle(chat)}
        showChevron
        before={<ChatAvatar chat={chat} />}
      />
    </Link>
  )
}
