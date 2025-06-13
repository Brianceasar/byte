// app/dashboard/admin/layout.tsx
import { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-6 bg-gray-50">{children}</main>
    </div>
  )
}

export default AdminLayout
