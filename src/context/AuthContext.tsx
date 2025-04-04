// src/context/AuthContext.tsx
import { createContext} from 'react'

type User = {
    fullName: string
    identifier: string
    token: string
}

type AuthContextType = {
    user: User | null
    setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

