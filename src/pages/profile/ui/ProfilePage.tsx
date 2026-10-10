import { Button, Panel } from '@maxhub/max-ui'
import { getApiErrorMessage } from '../../../shared/api'
import { useAccountSettings } from '../../../entities/session'
import { useLogout } from '../../../features/logout'
import { useThemePreference } from '../../../shared/lib'
import { ProfileAccountDetails } from './ProfileAccountDetails'
import { ProfileIdentity } from './ProfileIdentity'
import { ProfileQueryState } from './ProfileQueryState'
import { ProfileThemeSetting } from './ProfileThemeSetting'

export function ProfilePage() {
  const accountQuery = useAccountSettings()
  const { logout, isPending, hasError, error: logoutError } = useLogout()
  const { scheme, setScheme } = useThemePreference()

  return (
    <Panel className="mx-auto w-full max-w-[720px] !bg-transparent" mode="secondary">
      <div className="grid gap-5 p-5 max-[720px]:gap-4 max-[720px]:px-3 max-[720px]:pt-4 max-[720px]:pb-[calc(104px+env(safe-area-inset-bottom,0px))]">
        <ProfileIdentity account={accountQuery.data} isLoading={accountQuery.isLoading} />

        <ProfileQueryState
          isLoading={accountQuery.isLoading}
          isError={accountQuery.isError}
          isFetching={accountQuery.isFetching}
          error={accountQuery.error}
          onRetry={() => void accountQuery.refetch()}
        />

        <ProfileAccountDetails
          account={accountQuery.data}
          apiUrl={accountQuery.credentials?.apiUrl}
          idInstance={accountQuery.credentials?.idInstance}
        />

        <ProfileThemeSetting scheme={scheme} onChange={(nextScheme) => setScheme(nextScheme)} />

        <Button
          className="mt-1"
          variant="secondary"
          stretched
          loading={isPending}
          disabled={isPending}
          onClick={() => void logout()}
        >
          {isPending ? 'Отключаем…' : 'Выйти'}
        </Button>

        {hasError && (
          <p role="alert">
            Не удалось выйти: {getApiErrorMessage(logoutError)} Локальная сессия сохранена.
          </p>
        )}
      </div>
    </Panel>
  )
}
