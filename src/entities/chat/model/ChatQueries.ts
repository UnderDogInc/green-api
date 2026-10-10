import { queryOptions, skipToken } from '@tanstack/react-query'
import type { GreenApiCredentials } from '../../../shared/api'
import { getChatHistory, getChats, getContactInfo } from '../api/ChatApi'
import {
  CHAT_HISTORY_LIMIT,
  CHAT_HISTORY_REFETCH_INTERVAL_MS,
  CHAT_LIST_LIMIT,
  STALE_TIME_MS,
  EMPTY_LIST_REFETCH_INTERVAL_MS,
  MAX_EMPTY_LIST_FETCHES,
} from '../constants'

export const chatKeys = {
  list: (credentials: GreenApiCredentials | undefined, count: number) =>
    ['chats', 'list-v2', credentials?.apiUrl, credentials?.idInstance, count] as const,
  history: (credentials: GreenApiCredentials | undefined, chatId: string, count: number) =>
    ['chats', 'history', credentials?.apiUrl, credentials?.idInstance, chatId, count] as const,
  contact: (credentials: GreenApiCredentials | undefined, chatId: string) =>
    ['chats', 'contact', credentials?.apiUrl, credentials?.idInstance, chatId] as const,
  notifications: (credentials: GreenApiCredentials | undefined) =>
    ['chats', 'notifications', credentials?.apiUrl, credentials?.idInstance] as const,
}

export const chatsQueryOptions = (
  credentials: GreenApiCredentials | undefined,
  count = CHAT_LIST_LIMIT,
) =>
  queryOptions({
    queryKey: chatKeys.list(credentials, count),
    queryFn: credentials ? ({ signal }) => getChats(credentials, signal, count) : skipToken,
    staleTime: STALE_TIME_MS,
    refetchInterval: (query) =>
      !query.state.error &&
      query.state.data?.length === 0 &&
      query.state.dataUpdateCount < MAX_EMPTY_LIST_FETCHES
        ? EMPTY_LIST_REFETCH_INTERVAL_MS
        : false,
    refetchIntervalInBackground: false,
    meta: { errorDisplay: 'inline' },
  })

export const chatHistoryQueryOptions = (
  credentials: GreenApiCredentials | undefined,
  chatId: string,
  count = CHAT_HISTORY_LIMIT,
) =>
  queryOptions({
    queryKey: chatKeys.history(credentials, chatId, count),
    queryFn: credentials
      ? ({ signal }) => getChatHistory(credentials, signal, chatId, count)
      : skipToken,
    staleTime: 15_000,
    refetchInterval: CHAT_HISTORY_REFETCH_INTERVAL_MS,
    refetchIntervalInBackground: false,
    meta: { errorDisplay: 'inline' },
  })

export const contactInfoQueryOptions = (
  credentials: GreenApiCredentials | undefined,
  chatId: string,
  enabled = true,
) =>
  queryOptions({
    queryKey: chatKeys.contact(credentials, chatId),
    queryFn: credentials ? ({ signal }) => getContactInfo(credentials, signal, chatId) : skipToken,
    enabled,
    staleTime: 5 * STALE_TIME_MS,
  })
