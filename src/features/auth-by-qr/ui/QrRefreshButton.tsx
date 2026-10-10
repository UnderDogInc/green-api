import { IconButton } from '@maxhub/max-ui'
import { RefreshCw } from 'lucide-react'

interface Props {
  isRefreshing: boolean
  onClick: () => void
}
export function QrRefreshButton({ isRefreshing, onClick }: Props) {
  return (
    <IconButton
      variant="primary"
      aria-label="Обновить QR-код"
      title="Обновить QR-код"
      disabled={isRefreshing}
      onClick={onClick}
    >
      <RefreshCw
        className={
          isRefreshing
            ? 'animate-[refresh-spin_900ms_linear_infinite] motion-reduce:animate-none'
            : ''
        }
        size={22}
      />
    </IconButton>
  )
}
