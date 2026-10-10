import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/$')({
  beforeLoad: ({ params }) => {
    if (params._splat === 'auth-settings' || params._splat === 'authorize') {
      throw redirect({ to: '/login', search: { method: 'qr' }, replace: true })
    }

    throw notFound()
  },
})
