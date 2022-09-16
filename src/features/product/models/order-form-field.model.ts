import { ProductFormFieldModel } from "./product-form-field.model";
import { DisplayUser } from "../../auth/models/display-user.model";

export interface OrderFormFieldModel
  extends DisplayUser,
    ProductFormFieldModel {
  total: string;
  status: string;
}

export interface OrderDocument extends OrderFormFieldModel {
  _id: string;
  __v: number;
}
