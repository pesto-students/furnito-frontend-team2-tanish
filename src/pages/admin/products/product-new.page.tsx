import { CircularProgress, InputLabel, TextField } from "@mui/material";
import React, { FormEvent, SetStateAction, useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import useInput from "../../../hooks/input/use-input";
import {
  validateNameLength,
  validateStockLength,
} from "../../../shared/utils/validation/length";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { ProductFormFieldModel } from "../../../features/product/models/product-form-field.model";
import { addProduct, reset } from "../../../features/product/product-slice";
import ImageUploaderComponent from "../../../components/image-uploader/impage.uploader.component";

function ProductNewPage() {
  const [imgUrl, setImgUrl] = useState("");

  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.product);

  const getImageUrl = (img: SetStateAction<string>) => {
    setImgUrl(img);
  };

  const {
    text: name,
    shouldDisplayError: nameHasError,
    textChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearHandler: nameClearHandler,
  } = useInput(validateNameLength);

  const {
    text: price,
    shouldDisplayError: priceHasError,
    textChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    clearHandler: priceClearHandler,
  } = useInput(validateNameLength);

  const {
    text: stock,
    shouldDisplayError: stockHasError,
    textChangeHandler: stockChangeHandler,
    inputBlurHandler: stockBlurHandler,
    clearHandler: stockClearHandler,
  } = useInput(validateStockLength);

  const {
    text: description,
    shouldDisplayError: descriptionHasError,
    textChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    clearHandler: descriptionClearHandler,
  } = useInput(validateNameLength);

  const {
    text: category,
    shouldDisplayError: categoryHasError,
    textChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    clearHandler: categoryClearHandler,
  } = useInput(validateNameLength);

  function clearForm() {
    nameClearHandler();
    priceClearHandler();
    stockClearHandler();
    descriptionClearHandler();
    categoryClearHandler();
    setImgUrl("");
  }

  useEffect(() => {
    window.scroll(0, 0);
    if (isSuccess) {
      dispatch(reset());
      clearForm();
    }
  }, []);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productFormFieldModel: ProductFormFieldModel = {
      name,
      price,
      stock,
      description,
      category,
      image: imgUrl,
    };
    dispatch(addProduct(productFormFieldModel));
  };

  if (isLoading)
    return <CircularProgress sx={{ marginTop: "64px" }} color="primary" />;

  return (
    <div className="ml-auto pt-6 mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] ">
      <div className="sticky top-0 h-16 border-b bg-white lg:py-2.5">
        <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
          <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
            New Product
          </h5>
          <button type="button" className="w-12 h-16 -mr-2 border-r lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 my-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="px-6 pt-6 2xl:container overflow-auto">
        <div className="flex justify-center items-center h-[80vh]">
          <form
            autoComplete="off"
            action="/admin/products/new"
            onSubmit={onSubmitHandler}
            method="POST"
            className="w-full max-w-lg shadow-lg rounded-lg p-6"
          >
            {/* Name * Price */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </InputLabel>
                <TextField
                  fullWidth
                  value={name}
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                  error={nameHasError}
                  helperText={nameHasError ? "Enter the Product name" : ""}
                  type="text"
                  name="name"
                  id="name"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="price"
                >
                  Price
                </InputLabel>
                <TextField
                  fullWidth
                  value={price}
                  onChange={priceChangeHandler}
                  onBlur={priceBlurHandler}
                  error={priceHasError}
                  helperText={priceHasError ? "Enter the valid Amount" : ""}
                  inputProps={{
                    min: "10.00",
                    max: "10000.00",
                    step: "0.01",
                  }}
                  type="number"
                  name="price"
                  id="name"
                  variant="outlined"
                  size="small"
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <InputLabel
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </InputLabel>
                <TextField
                  multiline
                  rows={3}
                  maxRows={6}
                  fullWidth
                  value={description}
                  onChange={descriptionChangeHandler}
                  onBlur={descriptionBlurHandler}
                  error={descriptionHasError}
                  helperText={
                    descriptionHasError ? "Enter the Product Description" : ""
                  }
                  type="text"
                  name="description"
                  id="description"
                  variant="outlined"
                  size="small"
                />
              </div>
            </div>

            {/* Category & Stock */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Category
                </InputLabel>
                <TextField
                  fullWidth
                  value={category}
                  onChange={categoryChangeHandler}
                  onBlur={categoryBlurHandler}
                  error={categoryHasError}
                  helperText={
                    categoryHasError ? "Enter the Product Category" : ""
                  }
                  type="text"
                  name="category"
                  id="category"
                  variant="outlined"
                  size="small"
                />
              </div>

              {/*  Stock */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="stock"
                >
                  Stock
                </InputLabel>
                <TextField
                  fullWidth
                  value={stock}
                  onChange={stockChangeHandler}
                  onBlur={stockBlurHandler}
                  error={stockHasError}
                  helperText={stockHasError ? "Enter the valid Stock" : ""}
                  inputProps={{
                    min: "1",
                    max: "100",
                  }}
                  type="number"
                  name="stock"
                  id="stock"
                  variant="outlined"
                  size="small"
                />
              </div>

              {/*  Image Upload */}
              <div className="w-full px-3 mb-6 md:mb-0">
                {imgUrl.length > 0 ? (
                  <div className="w-full px-3 mb-6 md:mb-0 flex p-4">
                    <FiTrash2
                      onClick={() => setImgUrl("")}
                      className="m-4"
                      size="24px"
                      color="orange"
                    />
                    <a
                      className="break-all"
                      href={imgUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {imgUrl}
                    </a>
                  </div>
                ) : (
                  <ImageUploaderComponent getImageUrl={getImageUrl} />
                )}
              </div>
            </div>
            <button
              onClick={() => onSubmitHandler}
              type="submit"
              className="w-full text-white bg-primary-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductNewPage;
