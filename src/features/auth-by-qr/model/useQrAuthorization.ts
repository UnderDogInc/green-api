import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { instanceQrQueryOptions } from '../../../entities/session'
import type { Credentials } from '../../../entities/session'

const QR_LIFETIME = 20_000

export function useQrAuthorization(credentials: Credentials, enabled: boolean) {
  const [expiredAt, setExpiredAt] = useState(0)
  const qr = useQuery(instanceQrQueryOptions(credentials, enabled))

  const expired = qr.dataUpdatedAt > 0 && expiredAt === qr.dataUpdatedAt

  function refreshQr() {
    setExpiredAt(qr.dataUpdatedAt)
    void qr.refetch()
  }

  useEffect(() => {
    if (qr.data?.type !== 'qrCode' || !qr.dataUpdatedAt) {
      return
    }

    const remainingLifetime = Math.max(0, QR_LIFETIME - (Date.now() - qr.dataUpdatedAt))
    const timer = window.setTimeout(() => setExpiredAt(qr.dataUpdatedAt), remainingLifetime)

    return () => window.clearTimeout(timer)
  }, [qr.data?.type, qr.dataUpdatedAt])

  return {
    expired,
    refreshQr,
    qr,
  }
}
