import React, { FormEvent, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { resetCart, selectedProduct } from "../product-slice";
import { selectedUser } from "../../auth/auth-slice";

function PaymentComponent() {
  const navigate = useNavigate();
  const { cart } = useAppSelector(selectedProduct);
  const { user } = useAppSelector(selectedUser);
  let userId = "";
  if (user) {
    userId = user.id;
  }

  const dispatch = useAppDispatch();

  const [isProcessing, setIsProcessing] = React.useState(false);
  const [paymentStatus, setPaymentStatus] = React.useState("");

  // calculate the total price of the cart
  const subTotalPrice = cart.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  // calculate the total price of the cart including gst tax
  const total = subTotalPrice;

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    document.title = "Payments";
    window.scroll(0, 0);
    if (total === 0) return;
    if (paymentStatus !== "succeeded") return;
    if (paymentStatus === "succeeded") {
      dispatch(resetCart());
      navigate("/profile");
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (total === 0) return;
    if (!stripe || !elements) {
      return;
    }
    const cardEl = elements.getElement(CardElement);
    setIsProcessing(true);

    const createOrder = () => {
      const order = {
        userId,
        cart,
        total,
      };
      // cart items and user details to be sent to the server
      const result = axios.post(`${process.env.REACT_APP_BASE_API}/order/add`, {
        ...order,
      });
    };

    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_API}/stripe`, {
        cart,
      });

      const { client_secret: clientSecret } = res.data;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardEl!,
        },
      });

      if (!paymentIntent) {
        setPaymentStatus("Payment failed!");
      } else {
        setPaymentStatus(paymentIntent.status);
        // create order and clear the cart
        createOrder();
        dispatch(resetCart());
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      setPaymentStatus("Payment failed!");
    }

    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col mx-[35rem] my-20 px-8 py-4 font-barlow rounded overflow-hidden shadow-lg">
      <form onSubmit={handleSubmit} id="payment-form">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="text-dark-shades-100">Place order</label>
        <CardElement className="my-3" id="card-element" />
        {!isProcessing && (
          <button
            type="submit"
            className="bg-secondary-200 w-full text-white font-bold py-2 px-4 rounded hover:bg-secondary-300"
          >
            Pay
          </button>
        )}
        {isProcessing && <div>Processing...</div>}
        {!isProcessing && paymentStatus && <div>Status: {paymentStatus}</div>}
      </form>
    </div>
  );
}

function PaymentGateway() {
  const stripePromise = loadStripe(
    "pk_test_51LYNhySEzpZRx7cHFNkLRmBBgt8MdF9E2KKqPiuJfmqDWWbM8JRTji7plxJ4YMf34yxr5biE9iyTL4jZJEjtveUg00LhB6q7Vo",
  );
  return (
    <Elements stripe={stripePromise}>
      <PaymentComponent />
    </Elements>
  );
}

export default PaymentGateway;
