import {
  CircularProgress,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { FormEvent, SetStateAction, useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useInput from "../../../hooks/input/use-input";
import {
  validateNameLength,
  validateStockLength,
} from "../../../shared/utils/validation/length";
import Categories from "../../../utils/catergories.data";
import ProductImageUploadComponent from "./product-image-upload.component";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { ProductFormFieldModel } from "../../../features/product/models/product-form-field.model";
import { addProduct } from "../../../features/product/product-slice";
import { reset } from "../../../features/auth/auth-slice";

function ProductNewComponent() {
  const [Category, setCategory] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.product);
  const navigate = useNavigate();

  const getImageUrl = (img: SetStateAction<string>) => {
    setImgUrl(img);
  };

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCategory(event.target.value);
  };

  const {
    text: productName,
    shouldDisplayError: productNameHasError,
    textChangeHandler: productNameChangeHandler,
    inputBlurHandler: productNameBlurHandler,
  } = useInput(validateNameLength);

  const {
    text: productPrice,
    shouldDisplayError: productPriceHasError,
    textChangeHandler: productPriceChangeHandler,
    inputBlurHandler: productPriceBlurHandler,
  } = useInput(validateNameLength);

  const {
    text: productStock,
    shouldDisplayError: productStockHasError,
    textChangeHandler: productStockChangeHandler,
    inputBlurHandler: productStockBlurHandler,
  } = useInput(validateStockLength);

  const {
    text: productDescription,
    shouldDisplayError: productDescriptionHasError,
    textChangeHandler: productDescriptionChangeHandler,
    inputBlurHandler: productDescriptionBlurHandler,
  } = useInput(validateNameLength);

  function clearForm() {}

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
      navigate("../", { replace: true });
    }
  }, [isSuccess, dispatch]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productFormFieldModel: ProductFormFieldModel = {
      productName,
      productPrice,
      productStock,
      productDescription,
      productCategory: Category,
      productImage: imgUrl,
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
                  htmlFor="productName"
                >
                  Name
                </InputLabel>
                <TextField
                  fullWidth
                  value={productName}
                  onChange={productNameChangeHandler}
                  onBlur={productNameBlurHandler}
                  error={productNameHasError}
                  helperText={
                    productNameHasError ? "Enter the Product name" : ""
                  }
                  type="text"
                  name="productName"
                  id="productName"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="productPrice"
                >
                  Price
                </InputLabel>
                <TextField
                  fullWidth
                  value={productPrice}
                  onChange={productPriceChangeHandler}
                  onBlur={productPriceBlurHandler}
                  error={productPriceHasError}
                  helperText={
                    productPriceHasError ? "Enter the valid Amount" : ""
                  }
                  inputProps={{
                    min: "10.00",
                    max: "10000.00",
                    step: "0.01",
                  }}
                  type="number"
                  name="productPrice"
                  id="productName"
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
                  htmlFor="productDescription"
                >
                  Description
                </InputLabel>
                <TextField
                  multiline
                  rows={3}
                  maxRows={6}
                  fullWidth
                  value={productDescription}
                  onChange={productDescriptionChangeHandler}
                  onBlur={productDescriptionBlurHandler}
                  error={productDescriptionHasError}
                  helperText={
                    productDescriptionHasError
                      ? "Enter the Product Description"
                      : ""
                  }
                  type="text"
                  name="productDescription"
                  id="productDescription"
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
                  htmlFor="productName"
                >
                  Category
                </InputLabel>
                <TextField
                  fullWidth
                  value={Category}
                  onChange={handleChange}
                  type="text"
                  name="productCategory"
                  id="productCategory"
                  variant="outlined"
                  size="small"
                  helperText="Please select category"
                >
                  {Categories.map((option) => (
                    <MenuItem key={option.value} value={option.label}>
                      {option.label} {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              {/*  Stock */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="productStock"
                >
                  Stock
                </InputLabel>
                <TextField
                  fullWidth
                  value={productStock}
                  onChange={productStockChangeHandler}
                  onBlur={productStockBlurHandler}
                  error={productStockHasError}
                  helperText={
                    productStockHasError ? "Enter the valid Stock" : ""
                  }
                  inputProps={{
                    min: "1",
                    max: "100",
                  }}
                  type="number"
                  name="productStock"
                  id="productStock"
                  variant="outlined"
                  size="small"
                />
              </div>

              {/*  Image Upload */}
              <div className="w-full px-3 mb-6 md:mb-0">
                {imgUrl.length > 0 ? (
                  <>
                    <FiTrash2 onClick={() => setImgUrl("")} />
                    <p className="break-all">{imgUrl}</p>
                  </>
                ) : (
                  <ProductImageUploadComponent getImageUrl={getImageUrl} />
                )}
              </div>
            </div>
            <button
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

export default ProductNewComponent;
