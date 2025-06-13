import '../styles/globals.css'
import { ReactNode } from 'react'
import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
export const metadata = {
  title: 'Byte Shop',
  description: 'E-commerce platform with role-based access',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster position="top-center" />
         <Navbar />
          <main className="flex-grow px-4 py-6">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
