import { Avatar, Spinner, Typography } from '@maxhub/max-ui'
import type { AccountSettings } from '../../../entities/session'
import { getInitials } from '../../../shared/helpers'

interface Props {
  account?: AccountSettings
  isLoading: boolean
}
export function ProfileIdentity({ account, isLoading }: Props) {
  const displayName = account?.username || String(account?.phone || 'Профиль')
  const initials = getInitials(displayName)

  return (
    <header className="grid justify-items-center gap-3.5 px-2 pt-3 pb-5 text-center">
      {isLoading ? (
        <Spinner />
      ) : account?.avatar ? (
        <Avatar.Container size={96} form="circle">
          <Avatar.Image
            src={account.avatar}
            alt=""
            fallback={initials || '?'}
            fallbackGradient="blue"
          />
        </Avatar.Container>
      ) : (
        <Avatar.Container size={96} form="circle">
          <Avatar.Text gradient="blue">{initials || '?'}</Avatar.Text>
        </Avatar.Container>
      )}
      <div className="grid min-w-0 gap-1">
        <Typography.Headline variant="large-strong">{displayName}</Typography.Headline>
        {account?.phone && Number(account.phone) !== 0 && (
          <Typography.Body variant="small" className="text-[var(--text-secondary)]">
            {account.phone}
          </Typography.Body>
        )}
      </div>
    </header>
  )
}
