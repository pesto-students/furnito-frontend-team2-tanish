import { CircularProgress, InputLabel, TextField } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import useInput from "../../../hooks/input/use-input";
import {
  validateNameLength,
  validateStockLength,
} from "../../../shared/utils/validation/length";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { ProductFormFieldModel } from "../../../features/product/models/product-form-field.model";
import { addProduct, reset } from "../../../features/product/product-slice";
import Dropzone from "../../../components/dropzone/dropzone.component";

function ProductNewPage() {
  const [urls, setUrls] = useState(Array<URL>());
  const getImageUrl = (images: React.SetStateAction<Array<URL>>) => {
    setUrls(images);
  };
  const storedUser: string | null = localStorage.getItem("user");
  const user: any = storedUser ? JSON.parse(storedUser) : null;

  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.product);

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
    setUrls(Array<URL>());
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
    const productFormFieldModel: {
      images: URL[];
      price: number;
      name: string;
      description: string;
      stock: number;
      category: string;
      user: string;
    } = {
      name,
      price,
      stock,
      description,
      category,
      images: urls,
      user: user.id,
    };
    productFormFieldModel.price = Number(productFormFieldModel.price);
    productFormFieldModel.stock = Number(productFormFieldModel.stock);
    dispatch(addProduct(productFormFieldModel as ProductFormFieldModel));
  };

  if (isSuccess) {
    dispatch(reset());
    clearForm();
  }

  if (isLoading)
    return <CircularProgress sx={{ marginTop: "64px" }} color="primary" />;

  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full mb-12 px-4 mx-8 -my-16">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
                <h5 className="text-2xl text-gray-600 font-medium lg:block">
                  New Product
                </h5>
              </div>
            </div>
          </div>
          <div className="px-6 pt-6 2xl:container overflow-auto">
            <div className="flex justify-center items-center mb-12">
              <form
                autoComplete="off"
                action="/admin/products/new"
                onSubmit={onSubmitHandler}
                method="POST"
                className="w-full max-w-lg border p-6"
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
                        descriptionHasError
                          ? "Enter the Product Description"
                          : ""
                      }
                      type="text"
                      name="description"
                      id="description"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <InputLabel
                      className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="category"
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
                        categoryHasError ? "Enter the Category name" : ""
                      }
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
                      InputProps={{
                        inputProps: {
                          max: 100,
                          min: 10,
                        },
                      }}
                      type="number"
                      name="stock"
                      id="name"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
                {/*  Image Upload */}
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    {urls.length > 0 ? (
                      urls.map((url: any, index: number) => (
                        <div className="flex items-center content-between justify-between">
                          <img
                            src={url}
                            className="w-1/6 object-cover"
                            alt="img"
                          />
                          <FiTrash2
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                            onClick={() => {
                              setUrls(
                                urls.filter((_url: URL, _index: number) => {
                                  return index !== _index;
                                }),
                              );
                            }}
                          />
                        </div>
                      ))
                    ) : (
                      <Dropzone getImageUrl={getImageUrl} />
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
      </div>
    </div>
  );
}

export default ProductNewPage;
