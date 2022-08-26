import React, { FormEvent, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { resetCart, selectedProduct } from "../product-slice";

function PaymentComponent() {
  const { cart } = useAppSelector(selectedProduct);
  const dispatch = useAppDispatch();

  const [isProcessing, setIsProcessing] = React.useState(false);
  const [paymentStatus, setPaymentStatus] = React.useState("");

  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (totalQty === 0) return;
    if (paymentStatus !== "succeeded") return;
    dispatch(resetCart());
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (totalQty === 0) return;
    if (!stripe || !elements) {
      return;
    }
    const cardEl = elements.getElement(CardElement);
    setIsProcessing(true);

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
        dispatch(resetCart());
      }
    } catch (error) {
      console.error(error);
      setPaymentStatus("Payment failed!");
    }

    setIsProcessing(false);
  };
  return (
    <div style={{ fontSize: "20px" }}>
      <form onSubmit={handleSubmit} id="payment-form">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Place order</label>
        <CardElement id="card-element" />
        {!isProcessing && (
          <button
            type="submit"
            style={{
              marginTop: "16px",
              height: "31px",
              backgroundColor: "#f0c14b",
              color: "black",
              display: "flex",
              fontWeight: 600,
              fontSize: "20px",
              padding: "24px",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              width: "100%",
            }}
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
