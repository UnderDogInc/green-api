import type { ReactNode } from 'react'
import { Typography } from '@maxhub/max-ui'

export function PhoneAuthorizationPanel({ children }: { children: ReactNode }) {
  return (
    <section className="grid gap-3">
      <Typography.Title>Вход по номеру телефона</Typography.Title>
      {children}
    </section>
  )
}
