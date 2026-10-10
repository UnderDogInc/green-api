import type { Credentials } from '../../../entities/session'
import { useQrAuthorization } from '../model/useQrAuthorization'
import { getQrErrorMessage } from '../utils/getQrErrorMessage'
import { QrAuthorizationError } from './QrAuthorizationError'
import { QrCodeView } from './QrCodeView'
import { Spinner, Typography } from '@maxhub/max-ui'
interface Props {
  credentials: Credentials
  enabled: boolean
}
export function QrAuthorizationContent({ credentials, enabled }: Props) {
  const { expired, refreshQr, qr } = useQrAuthorization(credentials, enabled)
  const response = qr.data

  if (qr.isLoading) {
    return <Spinner />
  }

  if (qr.isError) {
    return (
      <QrAuthorizationError
        message="Не удалось получить QR-код. Проверьте сеть и попробуйте снова."
        isRefreshing={qr.isFetching}
        onRetry={refreshQr}
      />
    )
  }

  switch (response?.type) {
    case 'qrCode':
      return (
        <QrCodeView
          value={response.message}
          expired={expired}
          isRefreshing={qr.isFetching}
          onRefresh={refreshQr}
        />
      )
    case 'already_registered':
    case 'alreadyLogged':
      return (
        <Typography.Text color="secondary" role="status">
          Инстанс уже авторизован. Проверяем соединение…
        </Typography.Text>
      )
    case 'error':
      return (
        <QrAuthorizationError
          message={getQrErrorMessage(response.message)}
          isRefreshing={qr.isFetching}
          onRetry={refreshQr}
        />
      )
    default:
      return null
  }
}
