export interface DecodedToken {
    sub: string; // User email or ID
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
