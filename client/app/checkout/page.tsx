'use client'

import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ThankYouModal from '@/components/ThankYouModal'
import axios from 'axios'

const CheckoutPage = () => {
  const { cart, clearCart } = useCart()
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    try {
      const response = await axios.post('/orders', {
        userEmail: user?.sub || user?.email,
        total,
        items: cart.map(item => ({
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      })
    

    toast.success('Order placed successfully!')
    clearCart()
    setShowModal(true)
  } catch (error) {
      console.error('Error placing order:', error)
      toast.error('Failed to place order. Please try again.')
    }
  }
  


  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <ul className="space-y-4 mb-6">
        {cart.map(item => (
          <li key={item.id} className="border p-4 rounded flex justify-between">
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">x{item.quantity}</p>
            </div>
            <p>Tsh{(item.price * item.quantity).toFixed(2)}</p>
          </li>
        ))}
      </ul>

      <div className="border-t pt-4">
        <p className="text-lg font-semibold mb-4">Total: Tsh{total.toFixed(2)}</p>
        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </div>

      {/* ✅ Show Thank You Modal only when placed */}
      <ThankYouModal isOpen={showModal} onClose={() => router.push('/products')} />
    </div>
  )
}

export default CheckoutPage
