export interface ProductDetailsModel {
  _id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  feedback: Feedback;
}

export interface Feedback {
  rating: number;
  reviews: Review[];
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  _id: string;
  id: string;
}
