import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { BsFacebook, BsWhatsapp, BsTwitter } from "react-icons/bs";
import Avatar from "react-avatar";
import moment from "moment/moment";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import { TextField } from "@mui/material";
import uuid from "react-uuid";
import Skeleton from "react-loading-skeleton";
import SeoDataComponent from "../../components/layout/seo/seo-data.component";
import HeaderComponent from "../../features/product/components/header.component";
import FooterComponent from "../../components/layout/footer/footer.component";
import productService from "../../features/product/services/product.service";
import CarouselComponent from "../../components/carousel/carousel.component";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useAppSelector, useAppDispatch } from "../../hooks/redux/hooks";
import { selectedUser } from "../../features/auth/auth-slice";
import {
  incrementCart,
  decrementCart,
} from "../../features/product/product-slice";
import "react-loading-skeleton/dist/skeleton.css";

function ProductDetailsPage() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const scrollToReview = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector(selectedUser);

  const { id } = useParams();
  const [showReview, setShowReview] = useState(false);

  const [product, setProduct] = useState(
    Object({
      name: "",
      description: "",
      price: 0,
      images: [],
      category: "",
      stock: 0,
      numOfReviews: 0,
      ratings: 0,
      reviews: [
        {
          name: "",
          rating: 0,
          comment: "",
        },
      ],
    }),
  );

  const [addReview, setAddReview] = useState(
    Object({
      rating: 0,
      comment: "",
      productId: id,
    }),
  );

  useEffect(() => {
    document.title = "Product Details";
    window.scrollTo(0, 0);
    // make an api call to get product details
    if (id) {
      try {
        productService.fetchProductById(id).then((res: Object) => {
          setProduct((prev: Object) => ({ ...prev, ...res }));
        });
      } catch (error: any) {
        console.log(error);
      }
    }
  }, []);

  function handleTextFieldChange(e: any) {
    setAddReview((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleRatingChange(e: any, value: number) {
    setAddReview((prev: any) => ({
      ...prev,
      rating: value,
    }));
  }

  function handleSubmit() {
    if (user) {
      setShowReview(true);
      productService
        .createProductReview(user, addReview)
        .then((res: any) => {
          console.log({ res });
          setProduct((prev: any) => ({
            ...prev,
            numOfReviews: res.numOfReviews,
            ratings: res.ratings,
            reviews: res.reviews,
          }));
        })
        .catch((error: any) => {
          console.log({ error });
        })
        .finally(() => {
          setShowReview(false);
        });
    }
  }

  // @ts-ignore
  return (
    <>
      <HeaderComponent />
      <SeoDataComponent title="Product Details" />
      {showReview ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <form>
                  {/* header */}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Write a review for{" "}
                      {product.name || <Skeleton width={20} />}
                    </h3>
                    <button
                      type="button"
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowReview(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/* body */}
                  <div className="relative p-6 flex-auto">
                    <FormGroup>
                      <Rating
                        name="review"
                        sx={{ paddingBottom: 2 }}
                        onChange={(event, value) =>
                          value && handleRatingChange(event, value)
                        }
                      />
                      <TextField
                        sx={{ paddingBottom: 2 }}
                        name="comment"
                        variant="outlined"
                        placeholder="Write your review"
                        onChange={(event) => handleTextFieldChange(event)}
                      />
                    </FormGroup>
                  </div>
                  {/* footer */}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowReview(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-primary-100 text-white active:bg-primary-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => handleSubmit()}
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
      {product && (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-12 mx-auto">
            <div className="mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 text-primary-200">
                  {product.name || <Skeleton />}
                </h1>
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{product.price}
                </span>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <Rating
                      value={product.ratings || <Skeleton />}
                      precision={0.5}
                      max={5}
                      readOnly
                      name="unique-rating"
                    />
                    <button
                      type="button"
                      className="text-gray-600 ml-3 hover:text-secondary-100"
                      onClick={() =>
                        scrollToReview.current?.scrollIntoView({
                          behavior: "smooth",
                        })
                      }
                    >
                      {`${product.numOfReviews} Reviews` || <Skeleton />}
                    </button>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a
                      href={`https://wa.me/?text=${process.env.REACT_APP_BASE_API}${location.pathname}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 mr-3"
                    >
                      <BsWhatsapp className="hover:text-secondary-100" />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.REACT_APP_BASE_API}${location.pathname}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 mr-3"
                    >
                      <BsFacebook className="hover:text-secondary-100" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${process.env.REACT_APP_BASE_API}${location.pathname}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500"
                    >
                      <BsTwitter className="hover:text-secondary-100" />
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">
                  {product.description || <Skeleton count={4} />}
                </p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5" />
                <div className="flex">
                  {/* Increment and decrement buttons */}
                  <div className="flex flex-row  ">
                    <button
                      type="button"
                      className="border text-gray-600 hover:text-white hover:bg-secondary-200  w-8 rounded-l cursor-pointer outline-none"
                      onClick={() => {
                        dispatch(decrementCart(product));
                      }}
                    >
                      <span className="m-auto font-thin">−</span>
                    </button>
                    <input
                      className="outline-none focus:outline-none text-center  w-10  font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                      name="custom-input-number"
                    />
                    <button
                      type="button"
                      className="border text-gray-600 hover:text-white hover:bg-primary-100  w-8 rounded-r cursor-pointer"
                      onClick={() => {
                        dispatch(incrementCart(product));
                      }}
                    >
                      <span className="m-auto font-thin">+</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setShowReview(true)}
                    type="button"
                    className="flex ml-auto text-white bg-primary-100 border-0 py-2 px-6 focus:outline-none hover:bg-primary-200 rounded"
                  >
                    Add a Review
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 ">
                {<CarouselComponent images={product?.images} /> || (
                  <Skeleton
                    circle
                    height="100%"
                    containerClassName="avatar-skeleton"
                  />
                )}
              </div>
            </div>
            <div
              className="w-full flex flex-wrap bg-grey-light"
              ref={scrollToReview}
            >
              {product.reviews.length > 0 &&
                product.reviews.map((review: any) => (
                  <article
                    key={uuid()}
                    className="w-full md:w-1/2 lg:w-1/4 shadow-md px-8 py-4 m-8"
                  >
                    <div className="flex items-center mb-4 space-x-4">
                      <Avatar
                        color="#D1A75E"
                        className="rounded-full w-16 h-16 text-lg"
                        name={review?.name || <Skeleton />}
                        size="50"
                      />
                      <div className="space-y-1 font-medium dark:text-gray-600">
                        <p>
                          {review?.name || <Skeleton />}
                          <time
                            dateTime="2014-08-16 19:00"
                            className="block text-sm text-gray-500 dark:text-gray-400"
                          >
                            {moment(product.updatedAt).format(
                              "MMMM Do YYYY",
                            ) || <Skeleton />}
                          </time>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mb-1">
                      <Rating
                        value={review?.rating}
                        precision={0.5}
                        max={5}
                        readOnly
                        name="unique-rating"
                      />
                    </div>
                    <p className="mb-3 font-light text-gray-500 dark:text-gray-400">
                      {review?.comment}
                    </p>
                  </article>
                ))}
            </div>
          </div>
        </section>
      )}
      <FooterComponent />
    </>
  );
}

export default ProductDetailsPage;
