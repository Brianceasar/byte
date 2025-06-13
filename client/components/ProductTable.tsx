// components/ProductTable.tsx
import { Product } from '../app/types'

interface Props {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}

const ProductTable = ({ products, onEdit, onDelete }: Props) => {
  return (
    <table className="w-full text-sm border shadow bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left px-4 py-2 border">Name</th>
          <th className="text-left px-4 py-2 border">Description</th>
          <th className="text-left px-4 py-2 border">Price</th>
          <th className="text-left px-4 py-2 border">Stock</th>
          <th className="text-left px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id} className="border-t">
            <td className="px-4 py-2 border">{p.name}</td>
            <td className="px-4 py-2 border">{p.description}</td>
            <td className="px-4 py-2 border">Tsh.{p.price}</td>
            <td className="px-4 py-2 border">{p.stock}</td>
            <td className="px-4 py-2 border space-x-2">
              <button onClick={() => onEdit(p)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => onDelete(p.id)} className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductTable
