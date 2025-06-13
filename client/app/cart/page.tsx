'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import toast from 'react-hot-toast'

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/products" className="text-blue-600 underline">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <ul className="space-y-4">
        {cart.map(item => (
          <li key={item.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="text-sm">Quantity: {item.quantity}</p>
              <p className="font-bold mt-1">Tsh{item.price * item.quantity}</p>
            </div>
            <button
              onClick={() => {
                removeFromCart(item.id)
                toast.success(`Tsh{item.name} removed from cart`)
              }}
              className="text-red-600 hover:underline text-sm"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t pt-4">
        <p className="text-lg font-semibold">Total: Tsh{total.toFixed(2)}</p>

        <div className="flex gap-4 mt-4">
          <button
            onClick={clearCart}
            className="text-sm border px-4 py-2 rounded hover:bg-gray-100"
          >
            Clear Cart
          </button>

          <Link href="/checkout">
            <button className="text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartPage
