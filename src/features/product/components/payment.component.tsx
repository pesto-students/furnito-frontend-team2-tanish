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
import {
  resetCart,
  resetOrder,
  selectedProduct,
  updateOrder,
} from "../product-slice";
import FooterComponent from "../../../components/layout/footer/footer.component";
import HeaderComponent from "./header.component";
import { selectedUser } from "../../auth/auth-slice";
import productService from "../services/product.service";

function PaymentComponent() {
  const navigate = useNavigate();
  const { order } = useAppSelector(selectedProduct);
  const { user } = useAppSelector(selectedUser);

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
      console.log("payment succeeded");
    }
  }, []);

  useEffect(() => {
    if (paymentStatus === "succeeded" && order) {
      const apiOrder = { ...order };
      // @ts-ignore
      delete apiOrder._id;
      productService
        .addOrder(apiOrder)
        .then((res: any) => {
          console.log(res);
          dispatch(resetCart());
          dispatch(resetOrder());
          navigate("/profile");
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [paymentStatus]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (total === 0) return;
    if (!stripe || !elements) {
      return;
    }
    const cardEl = elements.getElement(CardElement);
    setIsProcessing(true);

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
        if (order && user) {
          dispatch(
            updateOrder({
              ...order,
              paymentInfo: {
                id: String(paymentIntent.id),
                status: paymentIntent.status,
              },
              user: user?.id,
              orderStatus: "Processing",
              paidAt: Date.now() as any,
            }),
          );
        }
      }
    } catch (error) {
      console.error(error);
      setPaymentStatus("Payment failed!");
    }

    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col my-20 px-8 py-4 rounded overflow-hidden shadow-lg md:mx-[12rem] lg:mx-[18rem]">
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
