'use client'

import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const CheckoutPage = () => {
  const { cart, clearCart } = useCart()
  const router = useRouter()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    if (cart.length === 0) {
      toast.error('Your cart is empty')
      router.push('/cart')
    }
  }, [cart, router])

  const handlePlaceOrder = () => {
    // Simulate successful checkout
    toast.success('Order placed successfully!')
    clearCart()
    router.push('/thank-you')
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
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </li>
        ))}
      </ul>

      <div className="border-t pt-4">
        <p className="text-lg font-semibold mb-4">Total: ${total.toFixed(2)}</p>
        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  )
}

export default CheckoutPage
