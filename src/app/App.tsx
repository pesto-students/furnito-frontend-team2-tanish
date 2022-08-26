import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouteComponent from "../components/private-route/private-route.component";
import HomePage from "../pages/home/home.page";
import CartPage from "../pages/cart/cart.page";
import RegisterPage from "../pages/auth/register/register.page";
import LoginPage from "../pages/auth/login/login.page";
import CheckoutPage from "../pages/checkout/checkout.page";
import AdminComponent from "../pages/admin/admin.component";

function App() {
  return (
    <div className="flex flex-col ">
      <ToastContainer autoClose={1000} position="bottom-right" draggable />
      <Routes>
        <Route
          path="/"
          element={<PrivateRouteComponent page={<HomePage />} />}
        />
        <Route
          path="/cart"
          element={<PrivateRouteComponent page={<CartPage />} />}
        />
        <Route
          path="/checkout"
          element={<PrivateRouteComponent page={<CheckoutPage />} />}
        />
        <Route
          path="/admin*"
          element={<PrivateRouteComponent page={<AdminComponent />} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
