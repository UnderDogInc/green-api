import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginPage } from '../../pages/login'
import { sessionKeys } from '../../entities/session'
import type { Credentials } from '../../entities/session'

export const Route = createFileRoute('/_auth/login')({
  validateSearch: (search: Record<string, unknown>) => ({
    method: search.method === 'phone' ? ('phone' as const) : ('qr' as const),
  }),
  component: LoginPage,
  beforeLoad: ({ context: { queryClient } }) => {
    if (queryClient.getQueryData<Credentials>(sessionKeys.credentials)) {
      throw redirect({ to: '/', replace: true })
    }
  },
})
