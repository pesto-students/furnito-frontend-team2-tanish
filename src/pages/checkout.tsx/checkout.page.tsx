import Container from "@mui/material/Container";
import AddressForm from "./address.form";
import FooterComponent from "../../components/layout/footer/footer.component";
import HeaderComponent from "../../features/product/components/header.component";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/hooks";
import {
  selectedProduct,
  updateOrder,
} from "../../features/product/product-slice";

export default function CheckoutPage() {
  const { order } = useAppSelector(selectedProduct);
  const dispatch = useAppDispatch();

  const handleChange = () => (e: { target: { name: any; value: any } }) => {
    if (order) {
      dispatch(
        updateOrder({
          ...order,
          shippingInfo: {
            ...order.shippingInfo,
            [e.target.name]: e.target.value,
          },
        }),
      );
    }
  };

  return (
    <>
      <HeaderComponent />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <AddressForm handleChange={handleChange} />
      </Container>
      <FooterComponent />
    </>
  );
}
