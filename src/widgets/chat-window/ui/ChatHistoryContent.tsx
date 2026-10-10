import { Button, Spinner, Typography } from '@maxhub/max-ui'
import type { useChatHistory } from '../model/useChatHistory'
import { getApiErrorMessage } from '../../../shared/api'
import { ChatMessage } from './ChatMessage'

const statusClass =
  'relative z-[1] grid min-h-full content-center justify-items-center gap-3 p-6 text-center'

export function ChatHistoryContent({ query }: { query: ReturnType<typeof useChatHistory> }) {
  if (query.isLoading) {
    return (
      <div className={statusClass} role="status">
        <Spinner />
      </div>
    )
  }

  if (query.isError) {
    return (
      <div className={statusClass} role="alert">
        <Typography.Text color="secondary">{getApiErrorMessage(query.error)}</Typography.Text>
        <Button variant="secondary" loading={query.isFetching} onClick={() => void query.refetch()}>
          Повторить
        </Button>
      </div>
    )
  }

  if (!query.data?.length) {
    return (
      <div className={statusClass}>
        <Typography.Text color="secondary">В этом чате пока нет сообщений.</Typography.Text>
      </div>
    )
  }

  return (
    <div className="relative z-[1] mx-auto flex min-h-full w-full max-w-[900px] flex-[1_0_auto] flex-col justify-end gap-3 px-3 py-5">
      {query.data.map((message) => (
        <ChatMessage key={message.idMessage} message={message} />
      ))}
    </div>
  )
}
