import React from "react";
import SingleProductComponent from "../product/product.component";

function PopularProducts() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-dark-shades-100">
            Popular Products
          </h1>
        </div>
        <div className="flex flex-wrap">
          <SingleProductComponent />
          <SingleProductComponent />
          <SingleProductComponent />
          <SingleProductComponent />
          <SingleProductComponent />
          <SingleProductComponent />
          <SingleProductComponent />
          <SingleProductComponent />
        </div>
      </div>
    </section>
  );
}
export default PopularProducts;
