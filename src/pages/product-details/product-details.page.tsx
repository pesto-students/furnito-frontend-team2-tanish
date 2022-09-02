import React, { useEffect } from "react";
import Rating from "@mui/material/Rating";
import { BsFacebook, BsWhatsapp, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import PopularProducts from "../../components/popular-products/popular-products.component";
import SeoDataComponent from "../../components/layout/seo/seo-data.component";
import HeaderComponent from "../../features/product/components/header.component";
import FooterComponent from "../../components/layout/footer/footer.component";

function ProductDetailsPage() {
  // const { id } = useParams();
  // make an api call to get the product details
  const product = {
    name: "Product Name",
    price: "100",
    description:
      "Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.",
    image: "https://source.unsplash.com/random",
    feedback: {
      rating: 4,
      reviews: [
        {
          id: 121,
          review: "I love this Product",
        },
        {
          id: 141,
          review: "I hate this Product",
        },
      ],
    },
  };

  useEffect(() => {
    document.title = "Product Details";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeaderComponent />
      <SeoDataComponent title="Product Details" />
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="max-w-full h-auto lg:w-1/2 w-full lg:h-auto object-cover object-center rounded"
              src={product.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <Rating
                    name="four-rating"
                    readOnly
                    defaultValue={product.feedback.rating}
                    precision={0.5}
                  />
                  <span className="text-gray-600 ml-3">
                    {product.feedback.reviews.length} Reviews
                  </span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <Link to="/" className="text-gray-500 mr-3">
                    <BsWhatsapp />
                  </Link>
                  <Link to="/" className="text-gray-500 mr-3">
                    <BsFacebook />
                  </Link>
                  <Link to="/" className="text-gray-500">
                    <BsInstagram />
                  </Link>
                </span>
              </div>
              <p className="leading-relaxed">{product.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <span className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" />
                  <span className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" />
                  <span className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none" />
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{product.price}
                </span>
                <button
                  type="button"
                  className="flex ml-auto text-white bg-primary-100 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PopularProducts />
      <FooterComponent />
    </>
  );
}

export default ProductDetailsPage;
