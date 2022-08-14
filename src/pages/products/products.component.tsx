import React from "react";
import SingleProductComponent from "../../components/product/product.component";

function ProductsComponent() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <SingleProductComponent />
          <SingleProductComponent />
          <SingleProductComponent />
          <SingleProductComponent />
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

export default ProductsComponent;
