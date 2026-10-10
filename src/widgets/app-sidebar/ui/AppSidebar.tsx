import { Avatar, IconButton } from '@maxhub/max-ui'
import { Link } from '@tanstack/react-router'
import { Folder, Settings } from 'lucide-react'
import { useAccountSettings } from '../../../entities/session'
import { getInitials } from '../../../shared/helpers'

export function AppSidebar() {
  const accountSettings = useAccountSettings()
  const account = accountSettings.data
  const displayName = account?.username || String(account?.phone || '')
  const initials = getInitials(displayName)

  return (
    <aside className="app-sidebar" aria-label="Боковая навигация">
      <div className="sidebar-avatar" title={displayName || 'Профиль пользователя'}>
        <Avatar.Container size={36} form="circle">
          {account?.avatar ? (
            <Avatar.Image src={account.avatar} alt="" />
          ) : (
            <Avatar.Text>{initials || '?'}</Avatar.Text>
          )}
        </Avatar.Container>
      </div>

      <nav className="sidebar-nav" aria-label="Разделы приложения">
        <IconButton
          asChild
          variant="ghost"
          className="sidebar-icon-button"
          aria-label="Чаты"
          title="Чаты"
        >
          <Link to="/" activeProps={{ className: 'sidebar-link-active' }}>
            <Folder size={22} aria-hidden="true" />
          </Link>
        </IconButton>

        <IconButton
          asChild
          variant="ghost"
          className="sidebar-icon-button"
          aria-label="Профиль"
          title="Профиль"
        >
          <Link to="/profile" activeProps={{ className: 'sidebar-link-active' }}>
            <Settings size={22} aria-hidden="true" />
          </Link>
        </IconButton>
      </nav>
    </aside>
  )
}
