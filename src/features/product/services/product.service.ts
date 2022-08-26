import axios from "axios";
import { toast } from "react-toastify";
import { ProductFormFieldModel } from "../models/product-form-field.model";
import { PaginatedSortModel } from "../models/paginated-sort-model";

const addProduct = async (
  product: ProductFormFieldModel,
): Promise<any | null> => {
  const response = await toast.promise(
    axios.post(`${process.env.REACT_APP_BASE_API}/product/add`, product),
    {
      pending: "Adding product...",
      success: "Product added successfully",
      error: "Unable to add product",
    },
  );
  return response.data;
};

const updateProduct = async (
  product: ProductFormFieldModel,
): Promise<any | null> => {
  const response = await toast.promise(
    axios.post(`${process.env.REACT_APP_BASE_API}/product/update`, { product }),
    {
      pending: "Updating product...",
      success: "Product updated successfully",
      error: "Unable to update product",
    },
  );
  return response.data;
};

const deleteProduct = async (productId: string): Promise<any | null> => {
  const response = await toast.promise(
    axios.delete(`${process.env.REACT_APP_BASE_API}/product/delete`, {
      params: { id: productId },
    }),
    {
      pending: "Deleting product...",
      success: "Product deleted successfully",
      error: "Unable to delete product",
    },
  );
  return response.data;
};

const fetchProduct = async (id: string): Promise<any | null> => {
  const response = await toast.promise(
    axios.get(`${process.env.REACT_APP_BASE_API}/product/get:${id}`),
    {
      pending: "Loading product...",
      success: "Product loaded successfully",
      error: "Unable to load product",
    },
  );
  return response.data;
};

const fetchProducts = async (
  paginatedSortData: PaginatedSortModel,
): Promise<any> => {
  const response = await toast.promise(
    axios.get(`${process.env.REACT_APP_BASE_API}/product/get`, {
      params: paginatedSortData,
    }),
    {
      pending: "Loading products...",
      success: "Products loaded successfully",
      error: "Unable to load products",
    },
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
