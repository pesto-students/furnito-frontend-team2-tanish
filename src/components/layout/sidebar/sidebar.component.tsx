import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/svg/logo.svg";
import admin from "../../../assets/images/admin.png";
import sidebarData from "../../../shared/sidebar-data";

function SidebarComponent() {
  return (
    <aside className="ml-[-100%] pt-6 fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4 flex justify-around">
          <Link to="/admin" title="home">
            <img src={logo} className="w-32" alt="furnito" />
          </Link>
        </div>
        <div className="mt-8 text-center">
          <img
            src={admin}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            Vasu Vallabh
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>
        <ul className="space-y-2 tracking-wide mt-8">
          {sidebarData.map((item) => (
            <li key={item.id}>
              <Link to={item.path} className={item.class}>
                {item.icon}
                <span className="group-hover:text-gray-700">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default SidebarComponent;
