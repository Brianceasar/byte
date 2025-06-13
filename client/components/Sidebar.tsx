// components/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded hover:bg-blue-100 ${
      pathname === path ? 'bg-blue-50 font-semibold text-blue-700' : ''
    }`

  return (
    <aside className="w-60 min-h-screen bg-white border-r p-4">
      <h2 className="text-xl font-bold text-blue-700 mb-6">ByteShop Admin</h2>
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard/admin/products" className={linkClass('/dashboard/admin/products')}>
          Manage Products
        </Link>
        
      </nav>
    </aside>
  )
}

export default Sidebar
