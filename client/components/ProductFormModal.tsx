'use client'

import { useState, useEffect } from 'react'
import { Product } from '../app/types'

type Props = {
  onSubmit: (form: Partial<Product>) => void
  onClose: () => void
  initialData?: Product | null
}

const ProductFormModal = ({ onSubmit, onClose, initialData }: Props) => {
  const [form, setForm] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
  })

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' ? Number(value) : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 w-full max-w-lg rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">{initialData ? 'Edit Product' : 'Add Product'}</h2>

        <input
          name="name"
          placeholder="Product Name"
          value={form.name || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price ?? ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock ?? ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-black"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {initialData ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductFormModal
