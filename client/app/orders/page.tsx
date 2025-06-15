'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import axios from '@/lib/axios'
import { Order } from '../types'



const OrdersPage = () => {
  const { user, token } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!token) return

    axios.get(`/orders/user?email=${user?.sub || user?.sub}`, {
      headers: {
         Authorization: `Bearer ${token}`
        },
    })
    .then(res => setOrders(res.data))
    .catch(() => console.error('Failed to fetch orders'))
  }, [token, user?.sub])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="border rounded p-4 mb-4">
            <p className="text-sm text-gray-600">Order ID: {order.id}</p>
            <p className="text-sm text-gray-600">Placed: {new Date(order.createdAt).toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total: ${order.total.toFixed(2)}</p>
            <ul className="mt-2 pl-4 list-disc">
              {order.items.map(item => (
                <li key={item.id}>
                  {item.productName} (x{item.quantity}) - ${item.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  )
}

export default OrdersPage
