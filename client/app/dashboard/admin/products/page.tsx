'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import axios from '@/lib/axios'
import ProductFormDrawer from '@/components/ProductFormDrawer'
import ProductTable from '@/components/ProductTable'
import { Product } from '../../../../app/types'
import toast from 'react-hot-toast'

const ProductsPage = () => {
  const { token } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [showDrawer, setShowDrawer] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProducts(response.data)
    } catch (err) {
      toast.error('Failed to fetch products')
      console.error(err)
    }
  }

  const handleCreate = async (data: Partial<Product>) => {
    try {
      await axios.post('/products', data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Product added!')
      setShowDrawer(false)
      fetchProducts()
    } catch {
      toast.error('Failed to add product')
    }
  }

  const handleUpdate = async (data: Partial<Product>) => {
    if (!editProduct) return
    try {
      await axios.put(`/products/${editProduct.id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Product updated!')
      setEditProduct(null)
      setShowDrawer(false)
      fetchProducts()
    } catch {
      toast.error('Failed to update product')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      await axios.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Product deleted!')
      fetchProducts()
    } catch{
      toast.error('Failed to delete product')
    }
  }

  const openAddDrawer = () => {
    setEditProduct(null)
    setShowDrawer(true)
  }

  const openEditDrawer = (product: Product) => {
    setEditProduct(product)
    setShowDrawer(true)
  }

  const closeDrawer = () => {
    setShowDrawer(false)
    setEditProduct(null)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setProducts(response.data)
      } catch (err) {
        toast.error('Failed to fetch products')
        console.error(err)
      }
    }
    fetchProducts()
  }, [token])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Products</h1>
        <button
          onClick={openAddDrawer}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      <ProductTable
        products={products}
        onEdit={openEditDrawer}
        onDelete={handleDelete}
      />

      <ProductFormDrawer
        isOpen={showDrawer}
        initialData={editProduct}
        onSubmit={editProduct ? handleUpdate : handleCreate}
        onClose={closeDrawer}
      />
    </div>
  )
}

export default ProductsPage