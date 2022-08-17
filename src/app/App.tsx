import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderComponent from "../components/layout/header/header.component";
import FooterComponent from "../components/layout/footer/footer.component";

import ProfileComponent from "../pages/profile/profile.component";

// lazy loading routes
const Home = lazy(() => import("../pages/home/home.component"));
const Register = lazy(
  () => import("../pages/auth/register/register.component"),
);
const Login = lazy(() => import("../pages/auth/login/login.component"));
const Products = lazy(() => import("../pages/products/products.component"));
const ProductDetails = lazy(
  () => import("../pages/product-details/product-details.component"),
);
const Cart = lazy(() => import("../pages/cart/cart.component"));
const FourOhFour = lazy(() => import("../pages/404/four-oh-four.component"));
const Loading = lazy(() => import("../components/loading/loading.component"));
const PrivateRoute = lazy(
  () => import("../components/private-route/private-route.component"),
);

function App() {
  return (
    <div className="flex flex-col ">
      <ToastContainer autoClose={3000} />
      <HeaderComponent />
      <Routes>
        <Route
          path="/*"
          element={
            <Suspense fallback={<Loading />}>
              <FourOhFour />
            </Suspense>
          }
        />
        {/* User Routes */}
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/home"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute page={<ProfileComponent />} />
            </Suspense>
          }
        />
        <Route
          path="/products"
          element={
            <Suspense fallback={<Loading />}>
              <Products />
            </Suspense>
          }
        />
        <Route
          path="/product"
          element={
            <Suspense fallback={<Loading />}>
              <ProductDetails />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<Loading />}>
              <Cart />
            </Suspense>
          }
        />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
