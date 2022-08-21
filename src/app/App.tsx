import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterComponent from "../components/layout/footer/footer.component";

import ProfileComponent from "../pages/profile/profile.component";
import HeaderComponent from "../components/layout/header/header.component";
import AdminComponent from "../pages/admin/admin.component";

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
  const location = useLocation();
  return (
    <div className="flex flex-col ">
      <ToastContainer autoClose={3000} />
      {location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/admin" &&
      location.pathname !== "/admin/dashboard" &&
      location.pathname !== "/admin/customers" &&
      location.pathname !== "/admin/orders" &&
      location.pathname !== "/admin/products" &&
      location.pathname !== "/admin/products/new" &&
      location.pathname !== "/admin/reviews" ? (
        <HeaderComponent />
      ) : null}
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
        <Route path="/admin/*" element={<AdminComponent />} />
      </Routes>
      {location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/admin" &&
      location.pathname !== "/admin/dashboard" &&
      location.pathname !== "/admin/customers" &&
      location.pathname !== "/admin/orders" &&
      location.pathname !== "/admin/products" &&
      location.pathname !== "/admin/products/new" &&
      location.pathname !== "/admin/reviews" ? (
        <FooterComponent />
      ) : null}
    </div>
  );
}

export default App;
