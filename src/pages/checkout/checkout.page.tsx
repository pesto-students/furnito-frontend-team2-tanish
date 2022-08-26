import React from "react";
import HeaderComponent from "../../features/product/components/header.component";
import FooterComponent from "../../components/layout/footer/footer.component";
import PaymentGateway from "../../features/product/components/payment.component";

function CheckoutPage() {
  return (
    <>
      <HeaderComponent />
      <PaymentGateway />
      <FooterComponent />
    </>
  );
}

export default CheckoutPage;
