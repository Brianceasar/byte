'use client'

import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, Users, ShoppingCart, BarChart3 } from 'lucide-react'
import axios from '@/lib/axios'
import { useState } from 'react'
import toast from 'react-hot-toast'


const AdminDashboard = () => {
  const { user, token } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
  totalUsers: 0,
  totalProducts: 0,
  totalOrders: 0,
})


  useEffect(() => {
  if (!token) {
    router.push('/auth/login')
    return
  }

  const isAdmin = user?.authorities?.includes('ROLE_ADMIN')
  if (!isAdmin) {
    router.push('/unauthorized')
    return
  }

  axios
    .get('/admin/stats', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setStats(res.data)
    })
    .catch(() => {
      toast.error('Failed to load dashboard stats')
    })
}, [user, token, router])


  const adminActions = [
    {
      title: 'Manage Products',
      description: 'Add, edit, and delete products',
      icon: Package,
      href: '/dashboard/admin/products',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: Users,
      href: '/admin/users',
      color: 'bg-green-50 hover:bg-green-100 border-green-200',
      iconColor: 'text-green-600'
    },
    {
      title: 'Orders',
      description: 'View and manage customer orders',
      icon: ShoppingCart,
      href: '/admin/orders',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Analytics',
      description: 'View sales reports and analytics',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
      iconColor: 'text-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your store and monitor performance</p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminActions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <Link key={index} href={action.href}>
                  <div className={`border rounded-lg p-6 transition-all duration-200 cursor-pointer ${action.color}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg ${action.iconColor}`}>
                        <IconComponent size={24} />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="text-blue-600" size={20} />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>

                  <p className="text-2xl font-semibold text-gray-900">-</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="text-green-600" size={20} />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>

                  <p className="text-2xl font-semibold text-gray-900">-</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <ShoppingCart className="text-purple-600" size={20} />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>

                  <p className="text-2xl font-semibold text-gray-900">-</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard