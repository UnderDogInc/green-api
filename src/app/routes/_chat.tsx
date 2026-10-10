import { createFileRoute, redirect } from '@tanstack/react-router'
import { sessionKeys } from '../../entities/session'
import type { Credentials } from '../../entities/session'
import { DefaultLayout } from '../../shared/layouts/DefaultLayout'

export const Route = createFileRoute('/_chat')({
  component: DefaultLayout,
  beforeLoad: ({ context: { queryClient } }) => {
    const sessionCredentials = queryClient.getQueryData<Credentials>(sessionKeys.credentials)
    if (sessionCredentials) {
      return
    }

    throw redirect({ to: '/login', search: { method: 'qr' }, replace: true })
  },
})
