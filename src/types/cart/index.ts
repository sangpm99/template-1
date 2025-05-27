export interface Cart {
  id: string;
  items: CartItem[];
  total: number;
}

export interface Variant {
  [key: string]: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  variation: Variant[];
  quantity: number;
  productName: string;
  productImage: string;
  price: number;
  salePrice?: number;
  subtotal: number; // price * quantity
  tax: number;
  metadata: string;
}
