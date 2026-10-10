import { Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AppSidebar } from '../../widgets/app-sidebar'
import { MobileNav } from '../../widgets/mobile-nav'

export function DefaultLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const chatOpen = pathname !== '/' && pathname !== '/profile'

  return (
    <div className="app-shell">
      <AppSidebar />

      <div className="app-content">
        <Outlet />
      </div>

      <MobileNav chatOpen={chatOpen} />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}
