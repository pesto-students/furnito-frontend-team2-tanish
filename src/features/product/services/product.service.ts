import axios from "axios";
import { ProductFormFieldModel } from "../models/product-form-field.model";

const addProduct = async (
  product: ProductFormFieldModel,
): Promise<any | null> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/product/add`,
    { product },
  );
  return response.data;
};

const updateProduct = async (
  product: ProductFormFieldModel,
): Promise<any | null> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/product/update`,
    { product },
  );
  return response.data;
};

const deleteProduct = async (id: string): Promise<any | null> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/product/delete`,
    { id },
  );
  return response.data;
};

const fetchProduct = async (id: string): Promise<any | null> => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_API}/product/get:${id}`,
  );
  return response.data;
};

const productService = {
  addProduct,
  updateProduct,
  deleteProduct,
  fetchProduct,
};

export default productService;
