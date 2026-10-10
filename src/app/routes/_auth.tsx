import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '../../shared/layouts/chat-layout/AuthLayout'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})
