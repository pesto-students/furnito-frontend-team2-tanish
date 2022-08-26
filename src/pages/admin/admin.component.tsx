import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardComponent from "./dashboard/dashboard.component";
import ProductsComponent from "./products/products.component";
import OrdersComponent from "./orders/orders.component";
import ReviewsComponent from "./reviews/reviews.component";
import SidebarComponent from "../../components/layout/sidebar/sidebar.component";
import CustomersComponent from "./customers/customers.component";
import FourOhFourPage from "../404/four-oh-four.page";
import ProductNewComponent from "./products/product-new.component";

function AdminComponent() {
  return (
    <div>
      <SidebarComponent />
      <Routes>
        <Route path="/" element={<DashboardComponent />} />
        <Route path="/dashboard" element={<DashboardComponent />} />
        <Route path="/products" element={<ProductsComponent />} />
        <Route path="/products/new" element={<ProductNewComponent />} />
        <Route path="/orders" element={<OrdersComponent />} />
        <Route path="/customers" element={<CustomersComponent />} />
        <Route path="/reviews" element={<ReviewsComponent />} />
        <Route path="/*" element={<FourOhFourPage />} />
      </Routes>
    </div>
  );
}

export default AdminComponent;
