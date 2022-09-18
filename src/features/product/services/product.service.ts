import axios from "axios";
import { toast } from "react-toastify";
import { ProductFormFieldModel } from "../models/product-form-field.model";
import { PaginatedSortModel } from "../models/paginated-sort-model";
import { Jwt } from "../../auth/models/jwt.model";
import { Order } from "../../order/services/model/orders.model";

const storedJwt: string | null = localStorage.getItem("jwt");
const jwt: Jwt = storedJwt ? JSON.parse(storedJwt) : null;

const headers = {
  headers: { Authorization: `Bearer ${jwt?.token}` },
};

const addProduct = async (
  product: ProductFormFieldModel,
): Promise<any | null> => {
  const response = await toast.promise(
    axios.post(
      `${process.env.REACT_APP_BASE_API}/product/add`,
      product,
      headers,
    ),
    {
      pending: "Adding product...",
      success: "Product added successfully",
      error: "Unable to add product",
    },
  );
  return response.data;
};

const addOrder = async (order: Order): Promise<any | null> => {
  console.log(order);
  const response = await toast.promise(
    axios.post(`${process.env.REACT_APP_BASE_API}/order/add`, order, headers),
    {
      pending: "Ordering...",
      success: "Ordered successfully",
      error: "Unable to order",
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
    axios.delete(
      `${process.env.REACT_APP_BASE_API}/product/delete/${productId}`,
      {
        ...headers,
      },
    ),
    {
      pending: "Deleting product...",
      success: "Product deleted successfully",
      error: "Unable to delete product",
    },
  );
  return response.data;
};

const deleteOrder = async (id: string): Promise<any> => {
  const response = await toast.promise(
    axios.delete(`${process.env.REACT_APP_BASE_API}/order/delete/${id}`, {
      ...headers,
    }),
    {
      pending: "Deleting order...",
      success: "Order deleted successfully",
      error: "Unable to delete order",
    },
  );
  return response.data;
};

const deleteCategories = async (categoryId: string): Promise<any | null> => {
  const response = await toast.promise(
    axios.delete(`${process.env.REACT_APP_BASE_API}/category/delete`, {
      params: { id: categoryId },
      ...headers,
    }),
    {
      pending: "Deleting category...",
      success: "Category deleted successfully",
      error: "Unable to delete category",
    },
  );
  return response.data;
};

const updateOrderStatus = async (id: string, status: string): Promise<any> => {
  const response = await toast.promise(
    axios.patch(
      `${process.env.REACT_APP_BASE_API}/order/update/${id}`,
      { status },
      headers,
    ),
    {
      pending: "Updating order status...",
      success: "Order status updated successfully",
      error: "Unable to update order status",
    },
  );
  return response.data;
};

const fetchProduct = async (id: string): Promise<any | null> => {
  console.log({ ...headers });
  const response = await toast.promise(
    axios.get(`${process.env.REACT_APP_BASE_API}/product/get:${id}`, {
      ...headers,
    }),
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
      ...headers,
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

const fetchProductsByCategory = async (
  paginatedSortData: PaginatedSortModel,
): Promise<any> => {
  const response = await toast.promise(
    axios.get(`${process.env.REACT_APP_BASE_API}/product/get`, {
      ...headers,
      params: paginatedSortData,
    }),
    {
      pending: "Loading sofas...",
      success: "Sofas loaded successfully",
      error: "Unable to load sofas",
    },
  );
  return response.data.products;
};

const fetchCategories = async (
  paginatedSortData: PaginatedSortModel,
): Promise<any> => {
  const response = await toast.promise(
    axios.get(`${process.env.REACT_APP_BASE_API}/category/get`, {
      ...headers,
      params: paginatedSortData,
    }),
    {
      pending: "Loading categories...",
      success: "Categories loaded successfully",
      error: "Unable to load categories",
    },
  );
  return response.data;
};

const fetchOrders = async (
  paginatedSortData: PaginatedSortModel,
): Promise<any> => {
  const response = await toast.promise(
    axios.get(`${process.env.REACT_APP_BASE_API}/order/get`, {
      ...headers,
      params: paginatedSortData,
    }),
    {
      pending: "Loading orders...",
      success: "Orders loaded successfully",
      error: "Unable to load orders",
    },
  );
  return response.data;
};

const allCount = async (): Promise<any> => {
  const response = await toast.promise(
    axios.get(`${process.env.REACT_APP_BASE_API}/product/count`, {
      ...headers,
    }),
    {
      pending: "Loading Admin Analytics...",
      success: "Analytics loaded successfully",
      error: "Unable to load Analytics",
    },
  );
  return response.data;
};

const uploadFiles = async (formData: any): Promise<any> => {
  const response = await toast.promise(
    axios.post(
      "https://api.cloudinary.com/v1_1/dh8fzzd4h/image/upload",
      formData,
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      },
    ),
    {
      pending: "Uploading images to cloudinary...",
      success: "Images uploaded to cloudinary successfully",
      error: "Unable to upload images to cloudinary",
    },
  );
  return response;
};

const fetchProductById = async (id: string): Promise<any> => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_API}/product/get/${id}`,
    {
      ...headers,
    },
  );
  return response.data;
};

const createProductReview = async (
  user: { name: string; id: string },
  review: any,
): Promise<any> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/product/review/${user.id}/${user.name}`,
    review,
    {
      ...headers,
    },
  );
  return response.data;
};

const productService = {
  addProduct,
  addOrder,
  updateProduct,
  deleteProduct,
  deleteCategories,
  fetchProduct,
  fetchProducts,
  fetchCategories,
  fetchOrders,
  fetchProductById,
  createProductReview,
  fetchProductsByCategory,
  allCount,
  uploadFiles,
  deleteOrder,
  updateOrderStatus,
};

export default productService;
