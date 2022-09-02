export type Orders = Order[];

export interface Order {
  _id: string;
  userId: string;
  cart: Cart[];
  total: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Cart {
  _id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  stock: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  quantity: number;
}
