import { ProductDocument } from "./product-form-field.model";

export interface CartItem extends ProductDocument {
  quantity: number;
}

export type Cart = CartItem[];
