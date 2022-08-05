import {
  AiOutlinePlus,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import React from "react";
import hero from "../../assets/images/hero.png";
import logo from "../../assets/svg/logo.svg";

/*  Landing Page for first commit */
function NavigationComponent() {
  return (
    <div className="flex flex-col h-screen">
      <header className="py-5 bg-transparent text-dark-shades-100 text-center">
        <div className="container mx-auto flex flex-wrap p-5 px-[148px] flex-col md:flex-row items-center">
          <a
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            href="./"
          >
            <img src={logo} alt="logo" />
          </a>
          <input
            placeholder="Search"
            className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center p-5 w-2/5 shadow-default background rounded-lg focus-visible: border-none, background-color: transparent, outline-0"
          />
          <a
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            href="./"
          >
            <AiOutlineShoppingCart
              size="1.5rem"
              color="#AA8C17"
              className="mr-6"
            />
            <AiOutlineUser size="1.5rem" color="#AA8C17" />
          </a>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto py-5">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-8 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-6xl text-6xl font-margic title-font mb-4 text-gray-900 px-[22rem] tracking-wider">
                <span className="text-secondary-100">
                  Discover Furniture With{" "}
                </span>
                <span className="text-dark-shades-100">High Quality Wood</span>
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed font-comfortaa text-gray-600 text-base w-1">
                Pellentesque etiam blandit in tincidunt at donec. Eget ipsum
                dignissim placerat nisi, adipiscing mauris non. Purus parturient
                viverra nunc, tortor sit laoreet. Quam tincidunt aliquam
                adipiscing tempor.
              </p>
            </div>
          </div>
          <div className="container py-14 mx-auto rounded-lg overflow-hidden">
            <img src={hero} alt="hero" />
          </div>
        </section>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-dark-shades-100">
                Popular Products
              </h1>
            </div>
            <div className="flex flex-wrap">
              <div className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-white rounded-lg shadow-inner">
                  <img
                    className="h-64 rounded-sm w-full object-cover object-center mb-3 shadow-default"
                    src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
                    alt="content"
                  />
                  <div className="container py-6 mx-auto">
                    <div className=" flex-shrink-0 lg:w-4/5 flex flex-col justify-between sm:flex-row sm:items-center items-start mx-auto">
                      <div className="pr-2">
                        <h3 className="tracking-widest text-secondary-100 text-xs font-comfortaa title-font">
                          Sofas
                        </h3>
                        <h2 className="text-lg text-dark-shades-100 font-barlow title-font mb-4 tracking-wider">
                          Landskrona
                        </h2>
                        <h1 className="flex-grow text-2xl text-secondary-500 font-barlow tracking-widest">
                          <span className="line-through text-light-shades-800">
                            ₹4490
                          </span>{" "}
                          ₹3990
                        </h1>
                      </div>
                      <button
                        type="button"
                        className="text-white bg-primary-100 border-0 p-6 shadow-default focus:outline-none hover:shadow-none rounded-lg text-lg mt-10 sm:mt-0"
                      >
                        {" "}
                        <AiOutlinePlus />{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-white rounded-lg shadow-inner">
                  <img
                    className="h-64 rounded-sm w-full object-cover object-center mb-3 shadow-default"
                    src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
                    alt="content"
                  />
                  <div className="container py-6 mx-auto">
                    <div className=" flex-shrink-0 lg:w-4/5 flex flex-col justify-between sm:flex-row sm:items-center items-start mx-auto">
                      <div className="pr-2">
                        <h3 className="tracking-widest text-secondary-100 text-xs font-comfortaa title-font">
                          Sofas
                        </h3>
                        <h2 className="text-lg text-dark-shades-100 font-barlow title-font mb-4 tracking-wider">
                          Landskrona
                        </h2>
                        <h1 className="flex-grow text-2xl text-secondary-500 font-barlow tracking-widest">
                          <span className="line-through text-light-shades-800">
                            ₹4490
                          </span>{" "}
                          ₹3990
                        </h1>
                      </div>
                      <button
                        type="button"
                        className="text-white bg-primary-100 border-0 p-6 shadow-default focus:outline-none hover:shadow-none rounded-lg text-lg mt-10 sm:mt-0"
                      >
                        {" "}
                        <AiOutlinePlus />{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-white rounded-lg shadow-inner">
                  <img
                    className="h-64 rounded-sm w-full object-cover object-center mb-3 shadow-default"
                    src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
                    alt="content"
                  />
                  <div className="container py-6 mx-auto">
                    <div className=" flex-shrink-0 lg:w-4/5 flex flex-col justify-between sm:flex-row sm:items-center items-start mx-auto">
                      <div className="pr-2">
                        <h3 className="tracking-widest text-secondary-100 text-xs font-comfortaa title-font">
                          Sofas
                        </h3>
                        <h2 className="text-lg text-dark-shades-100 font-barlow title-font mb-4 tracking-wider">
                          Landskrona
                        </h2>
                        <h1 className="flex-grow text-2xl text-secondary-500 font-barlow tracking-widest">
                          <span className="line-through text-light-shades-800">
                            ₹4490
                          </span>{" "}
                          ₹3990
                        </h1>
                      </div>
                      <button
                        type="button"
                        className="text-white bg-primary-100 border-0 p-6 shadow-default focus:outline-none hover:shadow-none rounded-lg text-lg mt-10 sm:mt-0"
                      >
                        {" "}
                        <AiOutlinePlus />{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-white rounded-lg shadow-inner">
                  <img
                    className="h-64 rounded-sm w-full object-cover object-center mb-3 shadow-default"
                    src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
                    alt="content"
                  />
                  <div className="container py-6 mx-auto">
                    <div className=" flex-shrink-0 lg:w-4/5 flex flex-col justify-between sm:flex-row sm:items-center items-start mx-auto">
                      <div className="pr-2">
                        <h3 className="tracking-widest text-secondary-100 text-xs font-comfortaa title-font">
                          Sofas
                        </h3>
                        <h2 className="text-lg text-dark-shades-100 font-barlow title-font mb-4 tracking-wider">
                          Landskrona
                        </h2>
                        <h1 className="flex-grow text-2xl text-secondary-500 font-barlow tracking-widest">
                          <span className="line-through text-light-shades-800">
                            ₹4490
                          </span>{" "}
                          ₹3990
                        </h1>
                      </div>
                      <button
                        type="button"
                        className="text-white bg-primary-100 border-0 p-6 shadow-default focus:outline-none hover:shadow-none rounded-lg text-lg mt-10 sm:mt-0"
                      >
                        {" "}
                        <AiOutlinePlus />{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NavigationComponent;
