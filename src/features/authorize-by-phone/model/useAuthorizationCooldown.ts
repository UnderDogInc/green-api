import { useEffect, useState } from 'react'
import { getCooldownSeconds } from './authorizationUtils'
const COOLDOWN_DURATION = 60_000

export function useAuthorizationCooldown(idInstance: string) {
  const storageKey = `green-api-auth-cooldown:${idInstance}`
  const [seconds, setSeconds] = useState(() => getCooldownSeconds(storageKey))

  useEffect(() => {
    if (!seconds) {
      return
    }

    const timer = window.setTimeout(() => setSeconds(getCooldownSeconds(storageKey)), 1000)
    return () => window.clearTimeout(timer)
  }, [seconds, storageKey])

  function start() {
    window.sessionStorage.setItem(storageKey, String(Date.now() + COOLDOWN_DURATION))
    setSeconds(COOLDOWN_DURATION / 1000)
  }

  return { seconds, start }
}
