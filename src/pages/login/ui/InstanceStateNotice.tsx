import { Button, Spinner } from '@maxhub/max-ui'
import { getApiErrorMessage } from '../../../shared/api'

interface Props {
  isLoading: boolean
  statusMessage: string | null
  error: Error | null
  hasInvalidCredentials: boolean
  onRetry: () => void
  onChangeInstance: () => void
}

export function InstanceStateNotice({
  isLoading,
  statusMessage,
  error,
  hasInvalidCredentials,
  onRetry,
  onChangeInstance,
}: Props) {
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      {statusMessage && (
        <p className="m-0" role="status">
          {statusMessage}
        </p>
      )}
      {error && (
        <div className="grid justify-items-center gap-3 text-center" role="alert">
          <p className="m-0">
            {hasInvalidCredentials
              ? 'Неверные данные инстанса. Проверьте idInstance и apiTokenInstance.'
              : getApiErrorMessage(error)}
          </p>
          <Button
            size={'small'}
            variant="secondary"
            onClick={hasInvalidCredentials ? onChangeInstance : onRetry}
          >
            {hasInvalidCredentials ? 'Изменить данные инстанса' : 'Повторить проверку'}
          </Button>
        </div>
      )}
    </>
  )
}
