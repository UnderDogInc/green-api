import { createContext } from 'react'
import type { AuthSessionContextValue } from '../types'

export const AuthSessionContext = createContext<AuthSessionContextValue | null>(null)
