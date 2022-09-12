import { useNavigate } from "react-router-dom";
import sofa from "../../assets/images/sofa.png";
import bed from "../../assets/images/bed.png";
import table from "../../assets/images/table.png";
import decor from "../../assets/images/decor.png";
import decor_two from "../../assets/images/decor_two.png";

export default function CategoriesComponent() {
  const navigate = useNavigate();
  return (
    <div className="pb-16">
      <div className="flex justify-center items-center">
        <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
          <div className="flex flex-col jusitfy-center items-center space-y-10">
            <div className="flex flex-col justify-center items-center space-y-2">
              <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800">
                Shop By Category
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 md:gap-x-8 w-full">
              <div className="relative group flex justify-center items-center h-full w-full">
                <img
                  className="object-center object-cover h-full w-full"
                  src={sofa}
                  alt="sofa"
                />
                <button
                  onClick={() => navigate("/categories/sofa")}
                  type="button"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
                >
                  Sofa
                </button>
                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
              </div>
              <div className="flex flex-col space-y-4 md:space-y-8 mt-4 md:mt-0">
                <div className="relative group flex justify-center items-center h-full w-full">
                  <img
                    className="object-center object-cover h-full w-full"
                    src={bed}
                    alt="shoe"
                  />
                  <button
                    type="button"
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
                  >
                    Bed
                  </button>
                  <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                </div>
                <div className="relative group flex justify-center items-center h-full w-full">
                  <img
                    className="object-center object-cover h-full w-full"
                    src={table}
                    alt="table"
                  />
                  <button
                    type="button"
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
                  >
                    Table
                  </button>
                  <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                </div>
              </div>
              <div className="relative group justify-center items-center h-full w-full hidden lg:flex">
                <img
                  className="object-center object-cover h-full w-full"
                  src={decor}
                  alt="decor"
                />
                <button
                  type="button"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
                >
                  Decor
                </button>
                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
              </div>
              <div className="relative group flex justify-center items-center h-full w-full mt-4 md:hidden md:mt-8 lg:hidden">
                <img
                  className="object-center object-cover h-full w-full hidden md:block"
                  src={decor_two}
                  alt="girl"
                />
                <img
                  className="object-center object-cover h-full w-full md:hidden"
                  src={decor_two}
                  alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2"
                />
                <button
                  type="button"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
                >
                  Decor
                </button>
                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
              </div>
            </div>
            <div className="relative group hidden md:flex justify-center items-center h-full w-full mt-4 md:mt-8 lg:hidden">
              <img
                className="object-center object-cover h-full w-full hidden md:block"
                src={decor_two}
                alt="girl"
              />
              <img
                className="object-center object-cover h-full w-full sm:hidden"
                src={decor_two}
                alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2"
              />
              <button
                type="button"
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
              >
                Decor
              </button>
              <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
