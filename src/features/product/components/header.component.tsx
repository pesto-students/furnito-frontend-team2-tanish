import { Badge, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import { IoLogOutSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import logo from "../../../assets/svg/logo.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { logout, selectedUser } from "../../auth/auth-slice";
import { selectedProduct } from "../product-slice";

function HeaderComponent() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { cart } = useAppSelector(selectedProduct);
  const { user } = useAppSelector(selectedUser);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const count = cart.reduce((acc, cur) => acc + cur.quantity, 0);
    setCartCount(count);
  }, []);

  const logoutHandler = () => dispatch(logout());

  return (
    <header className="sticky top-0 z-50 py-5 bg-white text-dark-shades-100 text-center">
      <nav className="bg-white border-gray-200 px-4 sm:px-8 py-2.5 rounded">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex items-center">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Furnito Logo" />
          </Link>
          <div className="flex items-center	">
            <div className="text-primary-300">{user?.name}</div>
            <Button onClick={() => navigate("/cart")}>
              <Badge badgeContent={cartCount} color="primary">
                <BsFillCartCheckFill color="#000" size="1.5rem" />
              </Badge>
            </Button>
            <Button
              type="button"
              onClick={logoutHandler}
              className="text-primary-300"
            >
              <IoLogOutSharp color="#000" size="1.5rem" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderComponent;
