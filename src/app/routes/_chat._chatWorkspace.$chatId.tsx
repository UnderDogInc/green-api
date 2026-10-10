import { createFileRoute } from '@tanstack/react-router'
import { ChatWindow } from '../../widgets/chat-window'

export const Route = createFileRoute('/_chat/_chatWorkspace/$chatId')({
  validateSearch: (search: Record<string, unknown>) => ({
    direct: search.direct === true || search.direct === 'true',
  }),
  component: ChatRouteComponent,
})

function ChatRouteComponent() {
  const { chatId } = Route.useParams()
  const { direct } = Route.useSearch()

  return <ChatWindow chatId={chatId} direct={direct} />
}
