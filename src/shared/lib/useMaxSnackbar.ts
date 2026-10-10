import * as MaxUI from '@maxhub/max-ui'
import type { SnackbarContextValue } from '@maxhub/max-ui'

type MaxUIWithSnackbarHook = typeof MaxUI & {
  useSnackbar: () => SnackbarContextValue
}

export function useMaxSnackbar() {
  return (MaxUI as MaxUIWithSnackbarHook).useSnackbar()
}
