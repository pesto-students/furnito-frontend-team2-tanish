import uuid from "react-uuid";
import { useEffect, useState } from "react";
import SingleProductComponent from "../../components/product/product.component";
import { PaginatedSortModel } from "../../features/product/models/paginated-sort-model";
import productService from "../../features/product/services/product.service";

function CategoriesPages(props: { name: any } & { main: any } & { sm: any }) {
  const { name, main, sm } = props;
  const [sofas, setSofas] = useState(Array<any>());
  const paginatedSortModel: PaginatedSortModel = {
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "asc",
    name,
  };
  useEffect(() => {
    document.title = name;
    window.scrollTo(0, 0);
    productService
      .fetchProductsByCategory(paginatedSortModel)
      .then((res: any) => {
        console.log(res);
        setSofas((prevState) => [...prevState, ...res]);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mx-auto container px-6 xl:px-0 ">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center">
          <div className="relative">
            <img className="hidden sm:block w-full" src={main} alt="sofa" />
            <img className="sm:hidden w-full" src={sm} alt="sofa" />
            <div className="absolute sm:bottom-8 bottom-4 pr-10 sm:pr-0 left-4 sm:left-8 flex justify-start items-start">
              <p className="text-3xl sm:text-4xl font-semibold leading-9 text-white shadow-black">
                Range Comfort {name.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
        <div className="my-10 px-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center">
          {sofas.length > 0 &&
            sofas.map(
              (sofa: {
                _id: string;
                name: string;
                price: number;
                images: Array<string>;
              }) => (
                <div
                  key={sofa._id}
                  className="group group-hover:bg-opacity-60 transition duration-500 relative sm:p-28 py-36 px-10 flex justify-center items-center shadow-lg rounded-lg bg-white"
                >
                  <SingleProductComponent key={uuid()} product={sofa} />
                </div>
              ),
            )}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPages;
