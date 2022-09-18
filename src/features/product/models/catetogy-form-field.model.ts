export interface CategoryFormFieldModel {
  name: string;
  image: Array<URL>;
}

export interface CategoryDocument extends CategoryFormFieldModel {
  _id: string;
  __v: number;
}
