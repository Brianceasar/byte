'use client'

import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { Product } from '../types'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const { addToCart } = useCart()
  const { user } = useAuth()

  const handleAddToCart = (product: Product) => {
  if (!user) {
    toast.error('Please log in to add to cart')
    return
  }
  addToCart(product)
  toast.success('Added to cart')
}

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products')
      setProducts(response.data)
    } catch {
      toast.error('Failed to load products')
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Browse Products</h1>

      <input
        type="text"
        placeholder="Search..."
        className="mb-6 p-2 border rounded w-full max-w-md"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="border rounded p-4 shadow-sm">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="font-bold mb-2">Tsh{product.price}</p>
              <button
                onClick={() => {
                  handleAddToCart(product)
                  toast.success('Added to cart')
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsPage
