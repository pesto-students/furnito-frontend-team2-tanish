import axios from "axios";
import { ProductFormFieldModel } from "../models/product-form-field.model";
import { PaginatedSortModel } from "../models/paginated-sort-model";

const addProduct = async (
  product: ProductFormFieldModel,
): Promise<any | null> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/product/add`,
    product,
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

const deleteProduct = async (productId: string): Promise<any | null> => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BASE_API}/product/delete`,
    { params: { id: productId } },
  );
  return response.data;
};

const fetchProduct = async (id: string): Promise<any | null> => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_API}/product/get:${id}`,
  );
  return response.data;
};

const fetchProducts = async (
  paginatedSortData: PaginatedSortModel,
): Promise<ProductFormFieldModel[]> => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_API}/product/get`,
    { params: paginatedSortData },
  );
  return response.data;
};

const productService = {
  addProduct,
  updateProduct,
  deleteProduct,
  fetchProduct,
  fetchProducts,
};

export default productService;
