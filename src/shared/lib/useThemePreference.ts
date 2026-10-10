import { useLocalStorage, usePreferredDark } from '@reactuses/core'

export type ColorScheme = 'light' | 'dark'

const storageKey = 'app-color-scheme'

export function useThemePreference() {
  const preferredScheme: ColorScheme = usePreferredDark() ? 'dark' : 'light'
  const [storedScheme, setScheme] = useLocalStorage<ColorScheme>(storageKey, preferredScheme, {
    serializer: {
      read: (value) => (value === 'light' || value === 'dark' ? value : preferredScheme),
      write: (value) => value,
    },
  })

  return {
    scheme: storedScheme ?? preferredScheme,
    setScheme,
  }
}
