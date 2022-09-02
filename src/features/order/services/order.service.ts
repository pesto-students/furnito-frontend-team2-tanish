import { toast } from "react-toastify";
import axios from "axios";
import { Orders } from "./model/orders.model";

const getOrdersByUser = async (userId: string): Promise<Orders | null> => {
  const response = await toast.promise(
    axios.get(`${process.env.REACT_APP_BASE_API}/order/:${userId}`),
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
      status: "cancelled",
    }),
    {
      pending: "Fetching Orders...",
      success: "Order fetched successfully",
      error: "Unable to fetch orders",
    },
  );
  return response.data;
};

const orderService = {
  getOrdersByUser,
  cancelOrder,
};

export default orderService;
