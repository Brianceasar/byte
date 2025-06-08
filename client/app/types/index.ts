export interface DecodedToken {
    sub: string; // User email or ID
    authorities: string[]; // User roles 
    exp: number; // Expiration timestamp
    iat?: number;
}