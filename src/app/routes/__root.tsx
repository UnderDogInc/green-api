import { Link, Outlet, createRootRouteWithContext, useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { Button as MaxButton } from '@maxhub/max-ui'
import type { QueryClient } from '@tanstack/react-query'
import { getApiErrorMessage } from '../../shared/api'
import { ErrorLayout } from '../../shared/layouts/ErrorLayout'
import { ErrorToast } from '../../shared/layouts/ErrorToast'

function RouteErrorPage({ error }: ErrorComponentProps) {
  const router = useRouter()

  return (
    <ErrorLayout
      title="Не удалось загрузить страницу"
      description={getApiErrorMessage(error)}
      action={<MaxButton onClick={() => router.invalidate()}>Повторить</MaxButton>}
    />
  )
}

function NotFoundPage() {
  return (
    <ErrorLayout
      title="Страница не найдена"
      description="Такого адреса нет или страница была перемещена."
      action={
        <MaxButton asChild>
          <Link to="/">На главную</Link>
        </MaxButton>
      }
    />
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => (
    <>
      <Outlet />
      <ErrorToast />
    </>
  ),
  errorComponent: RouteErrorPage,
  notFoundComponent: NotFoundPage,
})
