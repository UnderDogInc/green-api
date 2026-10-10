import { createFileRoute } from '@tanstack/react-router'
import { ChatLayout } from '../../shared/layouts/ChatLayout'

export const Route = createFileRoute('/_chat/_chatWorkspace')({
  component: ChatLayout,
})
