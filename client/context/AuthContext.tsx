'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import axios from '@/lib/axios';
import { DecodedToken } from '@/app/types';

interface AuthContextType {
  user: DecodedToken | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<DecodedToken | null>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('token')
    if (stored) {
      setToken(stored)
      const decoded = jwtDecode<DecodedToken>(stored)
      setUser(decoded)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await axios.post('/auth/login', { email, password })
    const receivedToken = response.data.token
    localStorage.setItem('token', receivedToken)
    setToken(receivedToken)
    const decoded = jwtDecode<DecodedToken>(receivedToken)
    setUser(decoded)
    router.push('/')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    router.push('/auth/login')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
