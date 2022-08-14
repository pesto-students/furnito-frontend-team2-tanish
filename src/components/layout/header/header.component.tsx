import React from "react";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import logo from "../../../assets/svg/logo.svg";

function HeaderComponent() {
  return (
    <header className="sticky top-0 z-50 py-5 bg-white text-dark-shades-100 text-center">
      <div className="container mx-auto flex flex-wrap p-5 px-[148px] flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img src={logo} alt="logo" />
        </Link>
        <input
          placeholder="Search"
          className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center p-5 w-2/5 shadow-default background rounded-lg focus-visible: border-none, background-color: transparent, outline-0"
        />
        <Link
          to="/auth"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <AiOutlineUser size="1.5rem" color="#AA8C17" className="mr-6" />
        </Link>
        <Link
          to="/cart"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <AiOutlineShoppingCart size="1.5rem" color="#AA8C17" />
        </Link>
      </div>
    </header>
  );
}
export default HeaderComponent;
