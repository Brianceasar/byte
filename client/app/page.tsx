// app/page.tsx
'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

const Home = () => {
  const { user } = useAuth()

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Welcome to Byte Shop</h1>

      {user ? (
        <>
          <p className="mt-4">Logged in as: <strong>{user.sub}</strong></p>
          <p className="mt-1">Roles: {user.authorities?.join(', ')}</p>

          {user.authorities?.includes('ROLE_ADMIN') && (
            <Link className="block mt-4 text-blue-600 underline" href="/dashboard/admin">
              Go to Admin Dashboard
            </Link>
          )}

          
        </>
      ) : (
        <>
          <div className="mt-4 flex gap-4">
            <Link href="/auth/login" className="text-blue-500 underline">Login</Link>
            <Link href="/auth/register" className="text-blue-500 underline">Register</Link>
          </div>
        </>
      )}
    </main>
  )
}

export default Home
