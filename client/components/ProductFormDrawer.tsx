'use client'

import { useEffect, useState } from 'react'
import { Product } from '../app/types'

type Props = {
  onSubmit: (form: Partial<Product>) => void
  onClose: () => void
  initialData?: Product | null
  isOpen: boolean
}

const ProductFormDrawer = ({ onSubmit, onClose, initialData, isOpen }: Props) => {
  const [form, setForm] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
  })

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    } else {
      setForm({ name: '', description: '', price: 0, stock: 0 })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-lg transform transition-transform z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">{initialData ? 'Edit' : 'Add'} Product</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            name="name"
            placeholder="Enter product name"
            value={form.name || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter product description"
            value={form.description || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (TSH)
          </label>
          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={form.price ?? ''}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Quantity
          </label>
          <input
            name="stock"
            type="number"
            placeholder="0"
            value={form.stock ?? ''}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button 
            type="button" 
            onClick={onClose} 
            className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {initialData ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductFormDrawer