import { IconButton, Typography } from '@maxhub/max-ui'
import { RefreshCw } from 'lucide-react'

interface Props {
  message: string
  isRefreshing: boolean
  onRetry: () => void
}

export function QrAuthorizationError({ message, isRefreshing, onRetry }: Props) {
  return (
    <div className="grid justify-items-center gap-3 text-center" role="alert">
      <Typography.Text>{message}</Typography.Text>
      <IconButton
        variant="secondary"
        aria-label="Запросить новый QR-код"
        title="Запросить новый QR-код"
        disabled={isRefreshing}
        onClick={onRetry}
      >
        <RefreshCw
          className={
            isRefreshing
              ? 'animate-[refresh-spin_900ms_linear_infinite] motion-reduce:animate-none'
              : undefined
          }
          size={20}
        />
      </IconButton>
    </div>
  )
}
