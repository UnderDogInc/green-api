import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSendChatMessage } from '../../../features/send-chat-message'

export function useChatComposer(chatId: string, onSent: () => void) {
  const sendMutation = useSendChatMessage(chatId)
  const [draft, setDraft] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const message = draft.trim()

    if (!message || sendMutation.isPending) {
      return
    }

    sendMutation.mutate(
      { message },
      {
        onSuccess: () => {
          setDraft('')
          onSent()
        },
      },
    )
  }

  return {
    draft,
    isPending: sendMutation.isPending,
    canSend: Boolean(draft.trim()),
    setDraft,
    submit,
  }
}
