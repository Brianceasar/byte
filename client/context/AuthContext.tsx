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
  hasRole: (role: string) => boolean
  isAuthenticated: () => boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<DecodedToken | null>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('token')
    if (stored) {
      try {
        setToken(stored)
        const decoded = jwtDecode<DecodedToken>(stored)
        setUser(decoded)
      } catch (error) {
        console.error('Error decoding token:', error)
        localStorage.removeItem('token')
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await axios.post('/auth/login', { email, password })
    const receivedToken = response.data.token
    localStorage.setItem('token', receivedToken)
    setToken(receivedToken)
    const decoded = jwtDecode<DecodedToken>(receivedToken)
    setUser(decoded)
    
    // Role-based redirect
    const isAdmin = decoded.authorities?.includes('ROLE_ADMIN')
    if (isAdmin) {
      router.push('/dashboard/admin')
    } else {
      router.push('/dashboard')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    router.push('/auth/login')
  }

  const hasRole = (role: string): boolean => {
    return user?.authorities?.includes(role) || false
  }

  const isAuthenticated = (): boolean => {
    return !!token && !!user
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      hasRole, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)