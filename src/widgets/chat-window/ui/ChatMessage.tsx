import { Typography } from '@maxhub/max-ui'
import type { ChatMessage as ChatMessageData } from '../../../entities/chat'
import { getMessageContent, getMessageDateTime, getMessageTime } from '../utils/messagePresentation'
import styles from './chat-window.module.scss'

export function ChatMessage({ message }: { message: ChatMessageData }) {
  const content = getMessageContent(message)
  const messageClass =
    message.type === 'outgoing'
      ? `${styles.outgoing} relative grid max-w-[min(80%,620px)] gap-1 rounded-[14px] rounded-br border-b-0 bg-[var(--background-tertiary)] px-3.5 py-2.5 [overflow-wrap:anywhere] self-end`
      : `${styles.incoming} relative grid max-w-[min(80%,620px)] gap-1 rounded-[14px] rounded-bl border-b-0 bg-[var(--background-secondary)] px-3.5 py-2.5 [overflow-wrap:anywhere] self-start`

  return (
    <article className={messageClass}>
      {message.type === 'incoming' && (message.senderContactName || message.senderName) && (
        <Typography.Text color="secondary">
          {message.senderContactName || message.senderName}
        </Typography.Text>
      )}
      <Typography.Text>{content}</Typography.Text>
      <time
        className="justify-self-end text-xs text-[var(--text-tertiary)]"
        dateTime={getMessageDateTime(message.timestamp)}
      >
        {getMessageTime(message.timestamp)}
      </time>
    </article>
  )
}
