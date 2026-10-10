import { useChatHistory } from '../model/useChatHistory'
import { useChatScroll } from '../model/useChatScroll'
import { ChatComposer } from './ChatComposer'
import { ChatHeader } from './ChatHeader'
import { ChatHistory } from './ChatHistory'

type Props = {
  chatId: string
  direct?: boolean
}

export function ChatWindow({ chatId, direct = false }: Props) {
  const history = useChatHistory(chatId)
  const scroll = useChatScroll(history.dataUpdatedAt)

  return (
    <section
      className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)_auto]"
      aria-label={`Чат ${chatId}`}
    >
      <ChatHeader chatId={chatId} direct={direct} />
      <ChatHistory
        query={history}
        historyRef={scroll.historyRef}
        showScrollDown={scroll.showScrollDown}
        onScroll={scroll.handleScroll}
        onScrollToBottom={scroll.scrollToBottom}
      />
      <ChatComposer chatId={chatId} onSent={scroll.scrollAfterSend} />
    </section>
  )
}
