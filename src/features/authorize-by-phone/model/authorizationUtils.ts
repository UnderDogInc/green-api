export function formatCountdown(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

export function getCooldownSeconds(storageKey: string) {
  const cooldownUntil = Number(window.sessionStorage.getItem(storageKey))

  return Number.isFinite(cooldownUntil)
    ? Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000))
    : 0
}
