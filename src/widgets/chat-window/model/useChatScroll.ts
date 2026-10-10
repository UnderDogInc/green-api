import { useEffect, useRef, useState } from 'react'

export function useChatScroll(updatedAt: number) {
  const historyRef = useRef<HTMLDivElement>(null)
  const isNearBottomRef = useRef(true)
  const [showScrollDown, setShowScrollDown] = useState(false)

  useEffect(() => {
    const element = historyRef.current
    if (element && isNearBottomRef.current) {
      element.scrollTop = element.scrollHeight
    }
  }, [updatedAt])

  function handleScroll() {
    const element = historyRef.current
    if (!element) {
      return
    }

    const distanceToBottom = element.scrollHeight - element.scrollTop - element.clientHeight
    const isNearBottom = distanceToBottom < 64
    isNearBottomRef.current = isNearBottom
    setShowScrollDown(!isNearBottom)
  }

  function scrollToBottom() {
    historyRef.current?.scrollTo({
      top: historyRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }

  function scrollAfterSend() {
    isNearBottomRef.current = true
    window.requestAnimationFrame(scrollToBottom)
  }

  return {
    historyRef,
    showScrollDown,
    handleScroll,
    scrollToBottom,
    scrollAfterSend,
  }
}
