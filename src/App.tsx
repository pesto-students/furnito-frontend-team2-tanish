import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Navigation = lazy(
  () => import("./routes/navigation/navigation.component"),
);
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Authentication = lazy(
  () => import("./routes/authentication/authentication.component"),
);
const Home = lazy(() => import("./routes/home/home.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const FourZeroFour = lazy(
  () => import("./routes/four-zero-four/four-zero-four.component"),
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="*" element={<FourZeroFour />} />
      </Route>
    </Routes>
  );
}

export default App;
