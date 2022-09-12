import React, { useEffect } from "react";
import uuid from "react-uuid";
import SingleProductComponent from "../product/product.component";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/hooks";
import {
  fetchProducts,
  selectedProduct,
} from "../../features/product/product-slice";

function PopularProducts() {
  const dispatch = useAppDispatch();
  const { products, paginatedSortData } = useAppSelector(selectedProduct);

  useEffect(() => {
    dispatch(fetchProducts(paginatedSortData));
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-dark-shades-100">
            Popular Products
          </h1>
        </div>
        <div className="flex flex-wrap">
          {products?.map((product) => (
            <SingleProductComponent key={uuid()} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default PopularProducts;
