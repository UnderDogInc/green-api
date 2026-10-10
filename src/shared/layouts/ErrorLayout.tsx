import { Typography } from '@maxhub/max-ui'
import type { ReactNode } from 'react'

type ErrorLayoutProps = {
  title: string
  description: string
  action?: ReactNode
}

export function ErrorLayout({ title, description, action }: ErrorLayoutProps) {
  return (
    <main className="centered-layout">
      <section className="error-panel">
        <Typography.Title>{title}</Typography.Title>
        <Typography.Text color="secondary">{description}</Typography.Text>

        {action}
      </section>
    </main>
  )
}
