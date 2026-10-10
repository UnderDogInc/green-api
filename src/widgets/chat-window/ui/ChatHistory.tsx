import { IconButton } from '@maxhub/max-ui'
import { ArrowDown } from 'lucide-react'
import type { useChatHistory } from '../model/useChatHistory'
import { ChatHistoryContent } from './ChatHistoryContent'
import styles from './chat-window.module.scss'

type Props = {
  query: ReturnType<typeof useChatHistory>
  historyRef: React.RefObject<HTMLDivElement | null>
  showScrollDown: boolean
  onScroll: () => void
  onScrollToBottom: () => void
}

export function ChatHistory({
  query,
  historyRef,
  showScrollDown,
  onScroll,
  onScrollToBottom,
}: Props) {
  return (
    <div className="relative min-h-0">
      <div
        ref={historyRef}
        className={`${styles.historyViewport} relative flex h-full min-h-0 w-full [scrollbar-gutter:stable] flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain`}
        onScroll={onScroll}
      >
        <ChatHistoryContent query={query} />
      </div>
      {showScrollDown && (
        <IconButton
          className="absolute right-6 bottom-4 z-[2] shadow-[0_2px_12px_color-mix(in_srgb,var(--text-primary)_18%,transparent)]"
          variant="secondary"
          aria-label="Прокрутить вниз"
          title="Прокрутить вниз"
          onClick={onScrollToBottom}
        >
          <ArrowDown size={20} aria-hidden="true" />
        </IconButton>
      )}
    </div>
  )
}
