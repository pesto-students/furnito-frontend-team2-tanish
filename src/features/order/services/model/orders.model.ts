export type Orders = Order[];

export interface ShippingInfo {
  address: string;
  city: string;
  country: string;
  pinCode: string;
  phoneNo: string;
}

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  product: string;
  _id: string;
}

export interface PaymentInfo {
  id: string;
  status: string;
}

export interface Order {
  _id: string;
  shippingInfo: ShippingInfo;
  orderedItems: Array<OrderItem>;
  user: string;
  paymentInfo: PaymentInfo;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: string;
  paidAt: string;
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
