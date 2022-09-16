import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import HeaderComponent from "../../features/product/components/header.component";
import { useAppSelector, useAppDispatch } from "../../hooks/redux/hooks";
import {
  decrementCart,
  incrementCart,
  removeItemFromCart,
  selectedProduct,
  updateOrder,
} from "../../features/product/product-slice";
import FooterComponent from "../../components/layout/footer/footer.component";
import EmptyCartPage from "../empty-cart/empty-cart.page";
import "react-loading-skeleton/dist/skeleton.css";
import { OrderItem } from "../../features/order/services/model/orders.model";

function CartPage() {
  useEffect(() => {
    document.title = "Cart";
    window.scrollTo(0, 0);
  }, []);

  const { cart, order } = useAppSelector(selectedProduct);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRemoveItemFromCart = (product: any) => {
    dispatch(removeItemFromCart(product._id));
  };

  // calculate the total price of the cart
  const itemsPrice = cart.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  // calculate gst tax amount of 18% of subtotal
  const taxPrice = itemsPrice * 0.18;

  // checkout.tsx charges
  const shippingPrice = 1500;

  // calculate the total price of the cart including gst tax
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const checkout = () => {
    const orderedItems: Array<OrderItem> = cart.map((item) => {
      return {
        product: item._id,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        image: String(item.images[0]),
        _id: item._id,
      };
    });
    if (order) {
      // order.itemsPrice = itemsPrice;
      dispatch(
        updateOrder({
          ...order,
          orderedItems,
          totalPrice,
          shippingPrice,
          taxPrice,
          itemsPrice,
        }),
      );
    }
    navigate("/checkout");
  };

  return (
    <>
      <HeaderComponent />
      {cart.length > 0 ? (
        <section className="py-10">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <main className="md:w-3/4">
                <article className="bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  {
                    // cart items
                    cart.map((product) => (
                      <div
                        key={product._id}
                        className="flex flex-wrap lg:flex-row gap-5  mb-4"
                      >
                        <div className="w-full lg:w-2/5 xl:w-2/4">
                          <figure className="flex leading-5">
                            <div>
                              <div className="block w-32 h-32 overflow-hidden">
                                <img
                                  src={String(product.images[0])}
                                  alt="Title"
                                />
                              </div>
                            </div>
                            <figcaption className="ml-3 flex flex-col justify-around">
                              <div>
                                <p>
                                  <Link
                                    to={`/product/${product._id}`}
                                    className="hover:text-primary-200"
                                  >
                                    {product.name || <Skeleton />}
                                  </Link>
                                </p>
                                <p className="mt-1 text-gray-400">
                                  <Link
                                    to={`/categories/${product.category}`}
                                    className="hover:text-gray-400"
                                  >
                                    {product.category || <Skeleton />}
                                  </Link>
                                </p>
                              </div>
                              <div className="flex items-center">
                                {/* create increment, decrement buttons */}
                                <div className="border cursor-pointer outline-none rounded flex flex-row p-2">
                                  <button
                                    type="button"
                                    className="text-gray-600 hover:text-white "
                                    onClick={() => {
                                      dispatch(decrementCart(product));
                                    }}
                                  >
                                    <span className="m-auto font-thin">−</span>
                                  </button>
                                  <input
                                    readOnly
                                    contentEditable="false"
                                    className="outline-none focus:outline-none text-center  w-10  font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                    name="custom-input-number"
                                    value={product.quantity}
                                  />
                                  <button
                                    type="button"
                                    className="text-gray-600 hover:text-white"
                                    onClick={() => {
                                      dispatch(incrementCart(product));
                                    }}
                                  >
                                    <span className="m-auto font-thin">+</span>
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  className="text-orange-700 ml-2 cursor-pointer hover:text-orange-900"
                                  onClick={() =>
                                    handleRemoveItemFromCart(product)
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            </figcaption>
                          </figure>
                        </div>
                        <div className="flex-auto">
                          <div className="float-right">
                            <div className="leading-5">
                              <p className="font-semibold not-italic">
                                ₹
                                {Number(product.price) *
                                  Number(product.quantity) || <Skeleton />}
                              </p>
                              <small className="text-gray-400">
                                {" "}
                                ₹{product.price} / per item{" "}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                  <hr className="my-4" />
                </article>
              </main>
              <aside className="md:w-1/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
                  <ul className="mb-5">
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>Subtotal:</span>
                      <span>₹{itemsPrice}</span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>Shipping:</span>
                      <span>₹{shippingPrice}</span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>GST:</span>
                      <span>₹{taxPrice}</span>
                    </li>
                    <li className="text-lg font-bold border-t flex justify-between mt-12 pt-3">
                      <span>Total price:</span>
                      <span>₹{totalPrice}</span>
                    </li>
                  </ul>

                  <button
                    onClick={() => checkout()}
                    type="button"
                    className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-primary-200 border border-transparent rounded-md hover:bg-primary-300"
                  >
                    {" "}
                    Checkout{" "}
                  </button>

                  <button
                    onClick={() => navigate("/home")}
                    type="button"
                    className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-primary-200 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                  >
                    {" "}
                    Back to shop{" "}
                  </button>
                </article>
              </aside>
            </div>
          </div>
        </section>
      ) : (
        <EmptyCartPage />
      )}
      <FooterComponent />
    </>
  );
}

export default CartPage;
