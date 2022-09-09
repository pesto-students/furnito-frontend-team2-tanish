export interface Review {
  name: string;
  rating: number;
  comment: string;
  _id: string;
  id: string;
}

export interface ProductFormFieldModel {
  name: string;
  description: string;
  price: number;
  images: Array<URL>;
  category: string;
  stock: number;
  numberOfReviews: number;
  ratings: number;
  reviews: Array<Review>;
}

export interface ProductDocument extends ProductFormFieldModel {
  _id: string;
  __v: number;
}
