import * as React from 'react'
import { subscribeRequestErrors } from '../../app/model/RequestErrorEvents'
import { useMaxSnackbar } from '../lib'

export function ErrorToast() {
  const { showSnackbar } = useMaxSnackbar()

  React.useEffect(() => {
    return subscribeRequestErrors((message) => {
      showSnackbar({ text: message, duration: 6000, placement: 'top-center' })
    })
  }, [showSnackbar])

  return null
}
