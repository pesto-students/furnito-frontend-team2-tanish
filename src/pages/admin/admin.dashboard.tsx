import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./dashboard/dashboard.page";
import ProductsPage from "./products/products.page";
import OrdersPage from "./orders/orders.page";
import ReviewsComponent from "./reviews/reviews.component";
import SidebarComponent from "../../components/layout/sidebar/sidebar.component";
import CustomersPage from "./customers/customers.page";
import FourOhFourPage from "../404/four-oh-four.page";
import ProductNewPage from "./products/product-new.page";
import CategoriesPage from "./cateogories/categories.page";
import CategoryNewPage from "./cateogories/category-new.page";
import AdminNavbarComponent from "./admin-navbar.component";

function AdminDashboard() {
  return (
    <>
      <SidebarComponent />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbarComponent />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/new" element={<CategoryNewPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<ProductNewPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/reviews" element={<ReviewsComponent />} />
          <Route path="/*" element={<FourOhFourPage />} />
        </Routes>
      </div>
    </>
  );
}

export default AdminDashboard;
