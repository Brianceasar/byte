'use client'

import { useEffect } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const ThankYouModal = ({ isOpen, onClose }: Props) => {
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => onClose(), 3000)
      return () => clearTimeout(timeout)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 shadow-lg text-center w-[90%] max-w-sm">
        <h2 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h2>
        <p className="text-gray-700">Your order has been placed successfully.</p>
      </div>
    </div>
  )
}

export default ThankYouModal
