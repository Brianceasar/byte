'use client'

import { useState } from 'react'
import { Product } from '../app/types'

interface Props {
  onSubmit: (product: Partial<Product>) => void
  onClose: () => void
  initial?: Product | null
}

const ProductForm = ({ onSubmit, onClose, initial }: Props) => {
  const [form, setForm] = useState<Partial<Product>>(initial || {})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 w-full max-w-lg rounded shadow">
        <h2 className="text-xl font-semibold mb-4">{initial ? 'Edit' : 'Add'} Product</h2>

        <input name="name" placeholder="Name" value={form.name || ''} onChange={handleChange}
          className="w-full mb-2 p-2 border rounded" required />

        <textarea name="description" placeholder="Description" value={form.description || ''} onChange={handleChange}
          className="w-full mb-2 p-2 border rounded" required />

        <input name="price" type="number" placeholder="Price" value={form.price || ''} onChange={handleChange}
          className="w-full mb-2 p-2 border rounded" required />

        <input name="stock" type="number" placeholder="Stock" value={form.stock || ''} onChange={handleChange}
          className="w-full mb-2 p-2 border rounded" required />

        <div className="flex justify-end gap-4 mt-4">
          <button type="button" onClick={onClose} className="text-gray-500">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {initial ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
