'use client'

import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const AdminDashboard = () => {
  const { user, token } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/auth/login')
      return
    }

    const isAdmin = user?.authorities?.includes('ROLE_ADMIN')

    if (!isAdmin) {
      router.push('/unauthorized')
    }
  }, [user, token, router])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">You have admin access ✅</p>
    </div>
  )
}

export default AdminDashboard
