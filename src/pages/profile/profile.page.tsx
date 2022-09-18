import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import FooterComponent from "../../components/layout/footer/footer.component";
import HeaderComponent from "../../features/product/components/header.component";
import { useAppSelector } from "../../hooks/redux/hooks";
import { selectedUser } from "../../features/auth/auth-slice";
import orderService from "../../features/order/services/order.service";
import {
  Order,
  OrderItem,
} from "../../features/order/services/model/orders.model";
import { PaginatedSortModel } from "../../features/product/models/paginated-sort-model";
import "react-loading-skeleton/dist/skeleton.css";

function ProfilePage() {
  const { user } = useAppSelector(selectedUser);
  const [orders, setOrders] = useState(Array<Order>());
  const paginatedSortData: PaginatedSortModel = {
    page: 1,
    limit: 10,
    sortBy: "stock",
    sortOrder: "asc",
    name: "63161935d2477d501fa29f1d",
  };

  useEffect(() => {
    document.title = "Profile";
    window.scrollTo(0, 0);
    if (user?.id) {
      try {
        orderService.getOrdersByUser(paginatedSortData).then((res: any) => {
          console.log(res.orders);
          setOrders((prevState) => [...prevState, ...res.orders]);
        });
      } catch (error: any) {
        console.log(error);
      }
    }
  }, []);

  const cancelOrder = (_id: string) => {
    try {
      orderService.cancelOrder(_id).then((res: any) => {
        if (res) {
          // here write the logic to update the current page
        }
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

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
              <div>
                <button
                  type="button"
                  onClick={() => cancelOrder(order._id)}
                  className="px-3 py-1 inline-block text-sm text-red-500 border border-gray-300 rounded-md hover:text-red-500 hover:border-red-600"
                >
                  Cancel order
                </button>
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
      <HeaderComponent />
      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <article className="rounded mb-5 p-3 lg:p-5">
                <figure className="flex items-start sm:items-center">
                  <Avatar
                    color="#D1A75E"
                    className="rounded-full mr-4 sm:mr-6 sm:w-24 sm:h-24"
                    name={user?.name}
                  />
                  <figcaption>
                    <h5 className="font-semibold text-lg">{user?.name}</h5>
                    <p>
                      Email: <a href="mailto:">{user?.email}</a>
                      {/* | Phone:{" "} <a href="tel:+1234567890988">{user?.email}</a> */}
                    </p>
                  </figcaption>
                </figure>
                <hr className="my-4" />
                <h3 className="text-xl font-semibold mb-5">ORDERS</h3>
                {ordersComponent()}
              </article>
            </main>
          </div>
        </div>
      </section>

      <FooterComponent />
    </>
  );
}
export default ProfilePage;
