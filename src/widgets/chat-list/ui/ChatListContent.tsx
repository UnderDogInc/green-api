import { Button, CellList, Spinner, Typography } from '@maxhub/max-ui'
import { getApiErrorMessage } from '../../../shared/api'
import type { useChats } from '../model/useChats'
import { ChatRow } from './ChatRow'

export function ChatListContent({ query }: { query: ReturnType<typeof useChats> }) {
  const { data, error, isError, isFetching, isLoading, refetch } = query
  const userChats = data?.filter((chat) => chat.type === 'user')

  if (isLoading || (isFetching && !userChats?.length)) {
    return (
      <div className="grid justify-items-center gap-2.5 px-2 py-5" role="status">
        <Spinner />
        <Typography.Text color="secondary">
          {isLoading ? 'Загружаем чаты…' : 'Обновляем список чатов…'}
        </Typography.Text>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="grid justify-items-start gap-2.5 px-2 py-5">
        <Typography.Title>Не удалось загрузить чаты</Typography.Title>
        <Typography.Text color="secondary">{getApiErrorMessage(error)}</Typography.Text>
        <Button
          variant="secondary"
          size={'small'}
          loading={isFetching}
          onClick={() => void refetch()}
        >
          Повторить
        </Button>
      </div>
    )
  }

  if (!userChats?.length) {
    return (
      <div className="grid justify-items-start gap-2.5 px-2 py-5">
        <Typography.Text color="secondary">Список чатов пуст.</Typography.Text>
      </div>
    )
  }

  return (
    <CellList className="w-full" mode="full-width">
      {userChats.map((chat) => (
        <ChatRow key={chat.id} chat={chat} />
      ))}
    </CellList>
  )
}
