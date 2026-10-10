import { Avatar } from '@maxhub/max-ui'
import { Link } from '@tanstack/react-router'
import { MessageCircle } from 'lucide-react'
import { useAccountSettings } from '../../../entities/session'
import { getInitials } from '../../../shared/helpers'

type Props = {
  chatOpen: boolean
}

export function MobileNav({ chatOpen }: Props) {
  const { data: account } = useAccountSettings()
  const displayName = account?.username || String(account?.phone || '')
  const initials = getInitials(displayName)

  return (
    <nav
      className={`fixed right-1/2 bottom-[calc(12px+env(safe-area-inset-bottom,0px))] z-50 hidden min-h-[58px] translate-x-1/2 items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--divider-primary)_70%,transparent)] bg-[color-mix(in_srgb,var(--background-primary)_76%,transparent)] px-[9px] py-[7px] shadow-[0_8px_28px_color-mix(in_srgb,var(--text-primary)_16%,transparent)] backdrop-blur-[22px] backdrop-saturate-[165%] max-[720px]:flex ${chatOpen ? 'max-[720px]:hidden' : ''}`}
      aria-label="Мобильная навигация"
    >
      <Link
        to="/"
        activeOptions={{ exact: true }}
        activeProps={{ className: 'bg-[var(--background-secondary)] text-[var(--icon-themed)]' }}
        className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3.5 text-sm font-semibold text-[var(--text-primary)] no-underline [-webkit-tap-highlight-color:transparent]"
        aria-label="Чаты"
      >
        <MessageCircle size={20} strokeWidth={2} aria-hidden="true" />
        <span>Чаты</span>
      </Link>

      <Link
        to="/profile"
        className="inline-flex h-11 w-11 min-w-11 items-center justify-center rounded-full text-[var(--text-primary)] no-underline [-webkit-tap-highlight-color:transparent]"
        activeProps={{ className: 'outline-2 outline-[var(--icon-themed)] outline-offset-2' }}
        aria-label="Профиль"
        title="Профиль"
      >
        <Avatar.Container size={36} form="circle">
          {account?.avatar ? (
            <Avatar.Image src={account.avatar} alt="" />
          ) : (
            <Avatar.Text>{initials || '?'}</Avatar.Text>
          )}
        </Avatar.Container>
      </Link>
    </nav>
  )
}
