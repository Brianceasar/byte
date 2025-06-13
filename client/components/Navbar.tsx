'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { LogOut, User, ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return (
    <nav className="bg-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="text-blue-600" size={24} />
            <span className="text-2xl font-bold text-blue-700">ByteShop</span>
          </Link>

          <div className="flex items-center space-x-4">
            {!hydrated ? (
              // Show nothing during SSR to match client-side initial state
              null
            ) : !user ? (
              <>
                <Link 
                  href="/auth/login" 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/auth/register" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className='flex items-center space-x-2 text-gray-700'>
                  <User size={16} />
                  <span className="text-sm text-gray-600">{user.sub}</span>
                </div>
                
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition-colors text-sm flex items-center space-x-1"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar