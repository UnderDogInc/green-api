import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  CHAT_HISTORY_LIMIT,
  CHAT_LIST_LIMIT,
  chatKeys,
  sendChatMessage,
} from '../../../entities/chat'
import type { ChatMessage } from '../../../entities/chat'
import { sessionKeys } from '../../../entities/session'
import type { GreenApiCredentials } from '../../../shared/api'

type SendMessageVariables = {
  message: string
}

export function useSendChatMessage(chatId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['chats', 'send-message', chatId],
    mutationFn: async ({ message }: SendMessageVariables) => {
      const credentials = queryClient.getQueryData<GreenApiCredentials>(sessionKeys.credentials)
      if (!credentials) {
        throw new Error('Нет активной сессии Green-API.')
      }

      return {
        response: await sendChatMessage(credentials, chatId, message),
        credentials,
      }
    },
    onSuccess: ({ response, credentials }, { message }) => {
      const queryKey = chatKeys.history(credentials, chatId, CHAT_HISTORY_LIMIT)

      const sentMessage: ChatMessage = {
        idMessage: response.idMessage,
        timestamp: Math.floor(Date.now() / 1000),
        type: 'outgoing',
        typeMessage: 'textMessage',
        chatId,
        textMessage: message,
      }

      queryClient.setQueryData<ChatMessage[]>(queryKey, (messages = []) =>
        [...messages, sentMessage].sort((first, second) => first.timestamp - second.timestamp),
      )
      void queryClient.invalidateQueries({
        queryKey: chatKeys.list(credentials, CHAT_LIST_LIMIT),
        exact: true,
      })
    },
  })
}
