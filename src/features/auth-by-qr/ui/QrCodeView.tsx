import { Typography } from '@maxhub/max-ui'
import { QrRefreshButton } from './QrRefreshButton'

interface Props {
  value: string
  expired: boolean
  isRefreshing: boolean
  onRefresh: () => void
}

export function QrCodeView({ value, expired, isRefreshing, onRefresh }: Props) {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="relative w-full max-w-80">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#ddeeff]">
          <img
            src={`data:image/png;base64,${value}`}
            alt="QR-код"
            className="block size-full object-contain"
          />

          {expired && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/55 p-6 text-center backdrop-blur-[2px]">
              <QrRefreshButton isRefreshing={isRefreshing} onClick={onRefresh} />

              <Typography.Text>QR-код протух</Typography.Text>
            </div>
          )}
        </div>
      </div>

      {!expired && (
        <Typography.Text color="secondary" className="text-center">
          QR-код активен около 20 секунд
        </Typography.Text>
      )}
    </div>
  )
}
