import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillInstagram,
  AiFillGithub,
  AiFillPhone,
  AiFillMail,
} from "react-icons/ai";
import logo from "../../../assets/svg/logo.svg";

function footerComponent() {
  return (
    <footer className="w-full py-16 bg-gray-100">
      <div className="md:px-12 lg:px-28">
        <div className="container m-auto space-y-6 text-gray-600">
          <img src={logo} alt="furnito" className="w-40 m-auto" />
          <ul className="py-4 flex flex-col gap-4 items-center justify-center sm:flex-row sm:gap-8">
            <li>
              <Link to="/home" className="hover:text-secondary-100">
                Home
              </Link>
            </li>
            <li>
              <Link to="/auth" className="hover:text-secondary-100">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-secondary-100">
                Admin
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-secondary-100">
                Products
              </Link>
            </li>
          </ul>
          <div className="w-max m-auto flex items-center justify-between space-x-4">
            <a href="tel:+91 7978120295" aria-label="call">
              <AiFillPhone size="28px" />
            </a>
            <a href="mailto:furnitio@mail.com" aria-label="send mail">
              <AiFillMail size="28px" />
            </a>
            <a
              href="https://github.com/orgs/pesto-students/teams/team2-tanish/repositories"
              title="github"
              target="_blank"
              aria-label="github"
              rel="noreferrer"
            >
              <AiFillGithub size="28px" />
            </a>
            <a
              href="https://www.instagram.com/?hl=en"
              title="instagram"
              target="_blank"
              aria-label="instagram"
              rel="noreferrer"
            >
              <AiFillInstagram size="28px" />
            </a>
          </div>

          <div className="text-center">
            <span className="text-sm tracking-wide">
              Copyright © furnito <span id="year" /> | All right reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default footerComponent;
