export interface ProductFormFieldModel {
  name: string;
  price: number;
  stock: number;
  description: string;
  category: string;
  image: string;
}

export interface ProductDocument extends ProductFormFieldModel {
  _id: string;
  __v: number;
}
