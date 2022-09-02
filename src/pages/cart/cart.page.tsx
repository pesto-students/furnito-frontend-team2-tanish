import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import HeaderComponent from "../../features/product/components/header.component";
import { useAppSelector, useAppDispatch } from "../../hooks/redux/hooks";
import {
  removeItemFromCart,
  selectedProduct,
} from "../../features/product/product-slice";
import FooterComponent from "../../components/layout/footer/footer.component";
import EmptyCartPage from "../empty-cart/empty-cart.page";

function CartPage() {
  const { cart } = useAppSelector(selectedProduct);
  const dispatch = useAppDispatch();

  const handleRemoveItemFromCart = (product: any) => {
    dispatch(removeItemFromCart(product._id));
  };

  // calculate the total price of the cart
  const subTotalPrice = cart.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  // calculate gst tax amount of 18% of subtotal
  const gstTax = subTotalPrice * 0.18;

  // calculate the total price of the cart including gst tax
  const totalPrice = subTotalPrice + gstTax;

  return (
    <>
      <HeaderComponent />
      {cart.length > 0 ? (
        <section className="py-10">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-around gap-4">
              <main className="md:3/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  {cart.map((cartItem) => (
                    <>
                      <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                        <div className="w-full lg:w-2/5 xl:w-2/4">
                          <figure className="flex leading-5">
                            <div>
                              <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                <img src={cartItem.image} alt="Title" />
                              </div>
                            </div>
                            <figcaption className="ml-3">
                              <p>
                                <a href="/home" className="hover:text-blue-600">
                                  {cartItem.name}
                                </a>
                              </p>
                              <p className="mt-1 text-gray-400">
                                {cartItem.description}
                              </p>
                            </figcaption>
                          </figure>
                        </div>
                        <div className="">
                          <div className="w-24 relative">
                            <select className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full">
                              <option>{cartItem.quantity}</option>
                            </select>
                            <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
                              <svg
                                width="22"
                                height="22"
                                className="fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M7 10l5 5 5-5H7z" />
                              </svg>
                            </i>
                          </div>
                        </div>
                        <div>
                          <div className="leading-5">
                            <p className="font-semibold not-italic">
                              ₹{cartItem.price * cartItem.quantity}
                            </p>
                            <small className="text-gray-400">
                              ₹{cartItem.price} / per item
                            </small>
                          </div>
                        </div>
                        <div className="flex-auto">
                          <div className="float-right">
                            <button
                              type="button"
                              onClick={() => handleRemoveItemFromCart(cartItem)}
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </>
                  ))}
                </article>
              </main>
              <aside className="md:w-1/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  <ul className="mb-5">
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>Subtotal price:</span>
                      <span>₹{subTotalPrice}</span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>GST:</span>
                      <span>₹{gstTax}</span>
                    </li>
                    <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                      <span>Total price:</span>
                      <span>₹{totalPrice}</span>
                    </li>
                  </ul>
                  <Link
                    to="/checkout"
                    type="button"
                    className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-primary-100 border border-transparent rounded-md hover:bg-primary-200"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    to="/home"
                    className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-primary-100 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                  >
                    Back to shop
                  </Link>
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
