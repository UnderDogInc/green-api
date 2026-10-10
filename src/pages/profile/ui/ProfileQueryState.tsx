import { Button, Spinner, Typography } from '@maxhub/max-ui'
import { getApiErrorMessage } from '../../../shared/api'

interface Props {
  isLoading: boolean
  isError: boolean
  isFetching: boolean
  error: Error | null
  onRetry: () => void
}

export function ProfileQueryState({ isLoading, isError, isFetching, error, onRetry }: Props) {
  if (isLoading) {
    return (
      <div className="grid justify-items-center gap-3 p-2 text-center" role="status">
        <Spinner />
        <Typography.Text color="secondary">Загружаем профиль…</Typography.Text>
      </div>
    )
  }

  if (!isError) {
    return null
  }

  return (
    <div className="grid justify-items-center gap-3 p-2 text-center" role="alert">
      <Typography.Text color="secondary">{getApiErrorMessage(error)}</Typography.Text>
      <Button variant="secondary" loading={isFetching} onClick={onRetry}>
        Повторить
      </Button>
    </div>
  )
}
