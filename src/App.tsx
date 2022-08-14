import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/layout/header/header.component";
import FooterComponent from "./components/layout/footer/footer.component";

// lazy loading routes
const Home = lazy(() => import("./pages/home/home.component"));
const Auth = lazy(() => import("./pages/auth/auth.component"));
const Products = lazy(() => import("./pages/products/products.component"));
const ProductDetails = lazy(
  () => import("./pages/product-details/product-details.component"),
);
const Cart = lazy(() => import("./pages/cart/cart.component"));
const FourOhFour = lazy(() => import("./pages/404/four-oh-four.component"));

const Dashboard = lazy(
  () => import("./pages/admin/dashboard/dashboard.component"),
);
const Loading = lazy(() => import("./components/loading/loading.component"));

function App() {
  const [isUser, setIsUser] = useState(true);

  useEffect(() => {
    setIsUser(true);
  }, []);

  return isUser ? (
    <div className="flex flex-col ">
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
          path="/auth"
          element={
            <Suspense fallback={<Loading />}>
              <Auth />
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
  ) : (
    <Routes>
      <Route
        path="/admin/dashboard"
        element={
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
