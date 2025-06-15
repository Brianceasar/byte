export interface DecodedToken {
    sub: string; // User email 
    authorities: string[]; // User roles 
    exp: number; // Expiration timestamp
    iat?: number;
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
}
export type OrderItem = {
  id: string | number
  productName: string
  quantity: number
  price: number
}

export type Order = {
  id: string | number
  createdAt: string
  total: number
  items: OrderItem[]
}