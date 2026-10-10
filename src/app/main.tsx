import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { MaxUI, SnackbarProvider, Spinner, Typography } from '@maxhub/max-ui'
import { queryClient } from './QueryClient'
import { router } from './router'
import { RouterProvider } from '@tanstack/react-router'
import { AuthSessionProvider } from '../entities/session'
import { useChatNotificationListener } from './model/useChatNotificationListener'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useThemePreference } from '../shared/lib'
import '@maxhub/max-ui/styles.css'
import '../styles.css'

function Application() {
  const { scheme: colorScheme } = useThemePreference()

  return (
    <MaxUI colorScheme={colorScheme} resetBody>
      <SnackbarProvider defaultPlacement="top-center">
        <QueryClientProvider client={queryClient}>
          <AuthSessionProvider
            fallback={
              <div
                className="grid min-h-screen place-content-center justify-items-center gap-3"
                role="status"
              >
                <Spinner />
                <Typography.Text color="secondary">Проверяем сессию…</Typography.Text>
              </div>
            }
          >
            <ChatNotificationListener />
            <RouterProvider router={router} />
            <ReactQueryDevtools buttonPosition="top-right" />
          </AuthSessionProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </MaxUI>
  )
}

function ChatNotificationListener() {
  useChatNotificationListener()
  return null
}

const rootElement = document.getElementById('app')!

ReactDOM.createRoot(rootElement).render(<Application />)
