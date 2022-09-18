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
import FooterComponent from "../../../components/layout/footer/footer.component";
import HeaderComponent from "./header.component";

function PaymentComponent() {
  const navigate = useNavigate();
  const { order } = useAppSelector(selectedProduct);

  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [paymentStatus, setPaymentStatus] = React.useState("");

  // calculate the total price of the cart including gst tax
  const total = order?.totalPrice;

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
      // cart items and user details to be sent to the server
      const result = axios.post(`${process.env.REACT_APP_BASE_API}/order/add`, {
        ...order,
      });
      console.log(result);
    };

    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_API}/stripe`, {
        total,
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
        console.log(paymentIntent);
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
    <div className="flex flex-col my-20 px-8 py-4 rounded overflow-hidden shadow-lg">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
        Payment
      </h1>
      <form
        onSubmit={handleSubmit}
        id="payment-form"
        className="space-y-4 md:space-y-6"
      >
        <div className="flex flex-col mt-4">
          <div className="mt-2">
            <CardElement className="mb-6" id="card-element" />
            {!isProcessing && (
              <div className="mt-2 flex flex-row">
                <button
                  type="submit"
                  className="w-full text-white bg-primary-200 hover:bg-primary-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  disabled={!stripe}
                >
                  Pay{`  ₹${total}`}
                </button>
              </div>
            )}
            {isProcessing && <div>Processing...</div>}
            {!isProcessing && paymentStatus && (
              <div>Status: {paymentStatus}</div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

function PaymentGateway() {
  const stripePromise = loadStripe(
    "pk_test_51LYNhySEzpZRx7cHFNkLRmBBgt8MdF9E2KKqPiuJfmqDWWbM8JRTji7plxJ4YMf34yxr5biE9iyTL4jZJEjtveUg00LhB6q7Vo",
  );
  return (
    <>
      <HeaderComponent />
      <Elements stripe={stripePromise}>
        <PaymentComponent />
      </Elements>
      <FooterComponent />
    </>
  );
}

export default PaymentGateway;
