import { Typography } from '@maxhub/max-ui'
import { useChats } from '../model/useChats'
import { PhoneChatForm } from './PhoneChatForm'
import { ChatListContent } from './ChatListContent'

export function ChatList() {
  const chatsQuery = useChats()

  return (
    <section
      className="grid h-full min-w-0 content-start gap-4 overflow-auto border-r border-[var(--divider-primary)] p-4 px-3 max-[720px]:pb-[calc(96px+env(safe-area-inset-bottom,0px))]"
      aria-busy={chatsQuery.isLoading}
    >
      <header className="grid gap-1">
        <Typography.Title>Чаты</Typography.Title>
      </header>

      <PhoneChatForm />
      <ChatListContent query={chatsQuery} />
    </section>
  )
}
