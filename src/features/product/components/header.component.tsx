import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdOutlineShoppingCart,
  MdOutlineLogout,
} from "react-icons/md";
import { useEffect, useState } from "react";
import logo from "../../../assets/svg/logo.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { logout, selectedUser } from "../../auth/auth-slice";
import { selectedProduct } from "../product-slice";

function HeaderComponent() {
  const dispatch = useAppDispatch();

  const { cart } = useAppSelector(selectedProduct);
  const { user } = useAppSelector(selectedUser);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const count = cart.reduce((acc, cur) => acc + cur.quantity, 0);
    setCartCount(count);
  }, [cart]);

  const logoutHandler = () => dispatch(logout());

  return (
    <header className="sticky top-0 z-50 py-5 bg-white text-dark-shades-100 text-center">
      <nav className="bg-white border-gray-200 px-4 sm:px-8 py-2.5 rounded">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex items-center">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Furnito Logo" />
          </Link>
          <div className="flex items-center	justify-end">
            <div className="text-gray-600 mr-4">{user?.name}</div>
            <Link to="/cart" className="mr-4">
              <Badge
                badgeContent={cartCount}
                sx={{
                  "& .MuiBadge-badge": {
                    color: "white",
                    backgroundColor: "#d1a75e",
                  },
                }}
              >
                <MdOutlineShoppingCart color="#3a4a4a" size="1.5rem" />
              </Badge>
            </Link>
            {user?.role === "admin" && (
              <Link to="/admin" className="mr-4">
                <MdOutlineDashboard color="#3a4a4a" size="1.5rem" />
              </Link>
            )}
            <button
              type="button"
              onClick={logoutHandler}
              className="text-primary-300 mr-4"
            >
              <MdOutlineLogout color="#3a4a4a" size="1.5rem" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderComponent;
