// Define the interface for a cart item
export interface CartItem {
  readonly id: number;
  name: string;
  brand: string;
  image: string;
  quantity: number;
  price: number;
}
