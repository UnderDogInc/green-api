import { Button, Typography } from '@maxhub/max-ui'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { QrGuideSlider } from './QrGuideSlider'

export function QrAuthorizationPanel({ children }: { children: ReactNode }) {
  const [showGuide, setShowGuide] = useState(false)
  return (
    <section className="grid justify-items-center gap-3 text-center">
      <Typography.Title>Отсканируйте QR-код</Typography.Title>
      <Button size={'small'} variant={'ghost'} onClick={() => setShowGuide(!showGuide)}>
        {showGuide ? 'Скрыть гайд' : 'Посмотреть гайд'}
      </Button>
      {showGuide && <QrGuideSlider />}
      {!showGuide && children}
    </section>
  )
}
