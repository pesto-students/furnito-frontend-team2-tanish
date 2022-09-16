import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import CardStatsComponent from "../card-stats.component";
import productService from "../../features/product/services/product.service";
import "react-loading-skeleton/dist/skeleton.css";

export default function AdminNavbarComponent() {
  const [allCount, setAllCount] = React.useState({
    products: 13,
    orders: 1,
    users: 2,
    reviews: 3,
  });

  useEffect(() => {
    document.title = "Dashboard";
    window.scrollTo(0, 0);
    productService
      .allCount()
      .then((res: any) => {
        setAllCount((prevState) => ({
          ...prevState,
          products: res.products,
          orders: res.orders,
          users: res.users,
          reviews: res.reviews,
        }));
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex" />
        </div>
      </nav>
      <div className="relative bg-secondary-100 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          {
            // Card stats
            allCount.products ? (
              <div>
                {/* Card stats */}
                <div className="flex flex-wrap">
                  <Link
                    to="/admin/products"
                    className="w-full lg:w-6/12 xl:w-3/12 px-4"
                  >
                    <CardStatsComponent
                      statSubtitle="PRODUCTS"
                      statTitle={String(allCount.products)}
                      statIconName="FaShoppingBag"
                      statIconColor="bg-red-500"
                    />
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="w-full lg:w-6/12 xl:w-3/12 px-4"
                  >
                    <CardStatsComponent
                      statSubtitle="ORDERS"
                      statTitle={String(allCount.orders)}
                      statIconName="FaCompass"
                      statIconColor="bg-orange-500"
                    />
                  </Link>
                  <Link
                    to="/admin/customers"
                    className="w-full lg:w-6/12 xl:w-3/12 px-4"
                  >
                    <CardStatsComponent
                      statSubtitle="CUSTOMERS"
                      statTitle={String(allCount.users)}
                      statIconName="FaUsers"
                      statIconColor="bg-pink-500"
                    />
                  </Link>
                  <Link
                    to="/admin/reviews"
                    className="w-full lg:w-6/12 xl:w-3/12 px-4"
                  >
                    <CardStatsComponent
                      statSubtitle="REVIEWS"
                      statTitle={String(allCount.reviews)}
                      statIconName="FaStar"
                      statIconColor="bg-blue-500"
                    />
                  </Link>
                </div>
              </div>
            ) : (
              <Skeleton height={200} />
            )
          }
        </div>
      </div>
    </>
  );
}
