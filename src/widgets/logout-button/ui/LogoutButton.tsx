import { Button } from '@maxhub/max-ui'
import { getApiErrorMessage } from '../../../shared/api'
import { useLogout } from '../../../features/logout'

export function LogoutButton() {
  const { logout, isPending, hasError, error } = useLogout()

  return (
    <div>
      <Button
        variant="secondary"
        size="small"
        loading={isPending}
        disabled={isPending}
        onClick={() => void logout()}
      >
        {isPending ? 'Отключаем…' : 'Выйти'}
      </Button>

      {hasError && (
        <p role="alert">
          Не удалось выйти: {getApiErrorMessage(error)} Локальная сессия сохранена.
        </p>
      )}
    </div>
  )
}
