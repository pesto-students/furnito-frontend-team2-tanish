import { toast } from "react-toastify";
import axios from "axios";
import { Orders } from "./model/orders.model";
import { Jwt } from "../../auth/models/jwt.model";
import { PaginatedSortModel } from "../../product/models/paginated-sort-model";

const storedJwt: string | null = localStorage.getItem("jwt");
const jwt: Jwt = storedJwt ? JSON.parse(storedJwt) : null;

const headers = {
  headers: { Authorization: `Bearer ${jwt?.token}` },
};

const getOrdersByUser = async (
  paginatedSortData: PaginatedSortModel,
): Promise<any | null> => {
  const response = await toast.promise(
    axios.get(`${process.env.REACT_APP_BASE_API}/order/get`, {
      ...headers,
      params: paginatedSortData,
    }),
    {
      pending: "Fetching Orders...",
      success: "Order fetched successfully",
      error: "Unable to fetch orders",
    },
  );
  return response.data;
};

const cancelOrder = async (orderId: string): Promise<Orders | null> => {
  const response = await toast.promise(
    axios.patch(`${process.env.REACT_APP_BASE_API}/order/cancel/${orderId}`, {
      ...headers,
      status: "cancelled",
    }),
    {
      pending: "Cancelling the Order...",
      success: "Order cancelled successfully",
      error: "Unable to cancel the order",
    },
  );
  return response.data;
};

const orderService = {
  getOrdersByUser,
  cancelOrder,
};

export default orderService;
