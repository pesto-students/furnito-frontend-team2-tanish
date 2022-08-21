import {
  RiDashboardFill,
  RiShoppingBag2Fill,
  RiStarSFill,
} from "react-icons/ri";
import { FaUsers, FaCompass } from "react-icons/fa";

const SidebarData = [
  {
    id: 1,
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <RiDashboardFill />,
    class:
      "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:text-gray-900 hover:bg-gray-100",
  },
  {
    id: 2,
    title: "Products",
    path: "/admin/products",
    icon: <RiShoppingBag2Fill />,
    class:
      "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:text-gray-900 hover:bg-gray-100",
  },
  {
    id: 3,
    title: "Orders",
    path: "/admin/orders",
    icon: <FaCompass />,
    class:
      "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:text-gray-900 hover:bg-gray-100",
  },
  {
    id: 4,
    title: "Customers",
    path: "/admin/customers",
    icon: <FaUsers />,
    class:
      "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:text-gray-900 hover:bg-gray-100",
  },
  {
    id: 5,
    title: "Reviews",
    path: "/admin/reviews",
    icon: <RiStarSFill />,
    class:
      "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:text-gray-900 hover:bg-gray-100",
  },
];

export default SidebarData;
