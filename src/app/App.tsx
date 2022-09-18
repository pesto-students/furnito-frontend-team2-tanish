import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy } from "react";
import PrivateRouteComponent from "../components/private-route/private-route.component";
import RegisterPage from "../pages/auth/register/register.page";
import LoginPage from "../pages/auth/login/login.page";
import CheckoutPage from "../pages/checkout.tsx/checkout.page";
import SofaPage from "../pages/sofa/sofa.page.";
// lazy load home page
const HomePage = lazy(() => import("../pages/home/home.page"));
const ProductDetailsPage = lazy(
  () => import("../pages/product-details/product-details.page"),
);
const PaymentComponent = lazy(
  () => import("../features/product/components/payment.component"),
);
const CartPage = lazy(() => import("../pages/cart/cart.page"));
const ProfilePage = lazy(() => import("../pages/profile/profile.page"));
const AdminDashboard = lazy(() => import("../pages/admin/admin.dashboard"));

function App() {
  return (
    <div className="flex flex-col">
      <ToastContainer autoClose={1000} position="bottom-right" draggable />
      <Routes>
        <Route
          path="/"
          element={<PrivateRouteComponent page={<HomePage />} />}
        />
        <Route
          path="/product/:id"
          element={<PrivateRouteComponent page={<ProductDetailsPage />} />}
        />
        <Route
          path="/cart"
          element={<PrivateRouteComponent page={<CartPage />} />}
        />
        <Route
          path="checkout/payment"
          element={<PrivateRouteComponent page={<PaymentComponent />} />}
        />
        <Route
          path="/checkout"
          element={<PrivateRouteComponent page={<CheckoutPage />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRouteComponent page={<ProfilePage />} />}
        />
        <Route
          path="/categories/:name"
          element={<PrivateRouteComponent page={<SofaPage />} />}
        />
        <Route
          path="/admin/*"
          element={<PrivateRouteComponent page={<AdminDashboard />} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
