import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { ApiError } from '../shared/api'
import { emitRequestError } from './model/RequestErrorEvents'

const queryCache = new QueryCache({
  onError: (error, query) => {
    if (query.meta?.errorDisplay !== 'inline') {
      emitRequestError(error)
    }
  },
})

const mutationCache = new MutationCache({
  onError: (error, _variables, _context, mutation) => {
    if (mutation.meta?.errorDisplay !== 'inline') {
      emitRequestError(error)
    }
  },
})

export const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      retry: (failureCount, error) =>
        failureCount < 1 &&
        (error instanceof TypeError || (error instanceof ApiError && error.status >= 500)),
    },
    mutations: { retry: false },
  },
})
