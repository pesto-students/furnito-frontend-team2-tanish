import React, { useEffect, useState } from "react";
import {
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";
import Skeleton from "react-loading-skeleton";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import productService from "../../../features/product/services/product.service";
import { PaginatedSortModel } from "../../../features/product/models/paginated-sort-model";
import DataTableBase from "../../../components/data-table/data-table.component";
import {
  Order,
  OrderItem,
} from "../../../features/order/services/model/orders.model";

function OrdersPage() {
  const [showOrder, setShowOrder] = useState(false);

  const [orders, setOrders] = useState(Array<any>());
  const paginatedSortModel: PaginatedSortModel = {
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  };

  function handleButtonClick(_id: any, edit: string) {
    console.log(_id, edit);
    switch (edit) {
      case "view":
        // open a dialog and view the order
        setShowOrder(true);
        break;
      case "delete":
        break;
      default:
        break;
    }
  }

  const columns = [
    {
      name: "Id",
      sortable: true,
      selector: (row: { _id: string }) => row._id,
    },
    {
      name: "orderStatus",
      sortable: true,
      selector: (row: { orderStatus: string }) => row.orderStatus,
    },
    {
      name: "Phone No",
      selector: (row: { shippingInfo: { phoneNo: number } }) =>
        row.shippingInfo?.phoneNo,
    },
    {
      name: "Action",
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row: { _id: any }) => (
        <>
          <HiOutlinePencilAlt
            color="#3BB9FF"
            fontSize="1.2rem"
            onClick={() => handleButtonClick(row._id, "edit")}
          />
          <HiOutlineEye
            color="#77dd77"
            fontSize="1.2rem"
            onClick={() => handleButtonClick(row._id, "view")}
          />
          <HiOutlineTrash
            color="#FFA62F"
            fontSize="1.2rem"
            onClick={() => handleButtonClick(row._id, "delete")}
          />
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    document.title = "Customers";
    productService
      .fetchOrders(paginatedSortModel)
      .then((res: any) => {
        setOrders((prevState) => [...prevState, ...res.orders]);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  function ordersComponent() {
    return (
      <>
        {orders.map((order: Order) => (
          <article
            key={order._id}
            className="p-3 lg:p-5 mb-5 bg-white border border-amber-400 rounded-md"
          >
            <header className="lg:flex justify-between mb-4">
              <div className="mb-4 lg:mb-0">
                <p className="font-semibold">
                  <span>Order ID: {order._id} </span>
                  <span className="text-green-500">
                    {" "}
                    • {order.orderStatus || <Skeleton />}
                  </span>
                </p>
                <p className="text-gray-500">
                  {" "}
                  {moment(order.paidAt).format("MMMM Do YYYY, h:mm:ss A") || (
                    <Skeleton />
                  )}{" "}
                </p>
              </div>
            </header>
            <div className="grid md:grid-cols-3 gap-2">
              <div>
                <p className="text-gray-400 mb-1">Person</p>
                <ul className="text-gray-600">
                  <li>Mike Johnatan</li>
                  <li>Phone: 371-295-9131</li>
                  <li>Email: info@mywebsite.com</li>
                </ul>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Delivery address</p>
                <ul className="text-gray-600">
                  <li>{order.shippingInfo.address}</li>
                  <li>
                    {" "}
                    {order.shippingInfo.city} {order.shippingInfo.country}
                  </li>
                  <li>{order.shippingInfo.pinCode}</li>
                </ul>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Payment</p>
                <ul className="text-gray-600">
                  <li className="text-green-400">Visa card **** 4242</li>
                  <li>Exp: 12/2022</li>
                  <li>Total paid: ₹{order.totalPrice}</li>
                </ul>
              </div>
            </div>
            <hr className="my-4" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
              {order.orderedItems.map((item: OrderItem) => (
                <figure key={item._id} className="flex flex-row mb-4">
                  <div>
                    <Link
                      to={`/product/${item.product}`}
                      className="block w-20 h-20 rounded border border-gray-200 overflow-hidden"
                    >
                      <img src={item.image} alt="Title" />
                    </Link>
                  </div>
                  <figcaption className="ml-3">
                    <p>
                      <Link
                        to={`/product/${item.product}`}
                        className="text-gray-600 hover:text-primary-200"
                      >
                        {item.name}
                      </Link>
                    </p>
                    <p className="mt-1 font-semibold">
                      {item.quantity}x = ₹{item.price * item.quantity}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </article>
        ))}
      </>
    );
  }

  return (
    <>
      {showOrder ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <form>
                  {/* header */}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">View Order</h3>
                    <button
                      type="button"
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowOrder(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/* body */}
                  <div className="relative p-6 flex-auto h-[60vh] overflow-auto">
                    {ordersComponent()}
                  </div>
                  {/* footer */}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowOrder(false)}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4 mx-8 -my-16">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
                  <h5 className="text-2xl text-gray-600 font-medium lg:block">
                    Orders
                  </h5>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <div className="justify-center items-center">
                <DataTableBase
                  className="items-center w-full bg-transparent border-collapse"
                  columns={columns}
                  data={orders}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
