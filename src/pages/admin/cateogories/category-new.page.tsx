import { InputLabel, TextField } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import useInput from "../../../hooks/input/use-input";
import { validateNameLength } from "../../../shared/utils/validation/length";
import { CategoryFormFieldModel } from "../../../features/product/models/catetogy-form-field.model";
import categoryService from "../../../features/category/services/categories.service";
import Dropzone from "../../../components/dropzone/dropzone.component";

function CategoryNewPage() {
  const [urls, setUrls] = useState(Array<URL>());
  const getImageUrl = (images: React.SetStateAction<URL[]>) => {
    setUrls(images);
  };

  const {
    text: name,
    shouldDisplayError: nameHasError,
    textChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearHandler: nameClearHandler,
  } = useInput(validateNameLength);

  function clearForm() {
    nameClearHandler();
    setUrls(Array<URL>());
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const categoryFormFieldModel: CategoryFormFieldModel = {
      name,
      image: urls,
    };

    // make an axios api call to add category
    try {
      categoryService.addCategory(categoryFormFieldModel).then(() => {
        clearForm();
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="ml-auto pt-6 mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] ">
      <div className="sticky top-0 h-16 border-b bg-white lg:py-2.5">
        <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
          <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
            New Category
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
            action="/admin/category/new"
            onSubmit={onSubmitHandler}
            method="POST"
            className="w-full max-w-lg shadow-lg rounded-lg p-6"
          >
            {/* Name */}
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
                  helperText={nameHasError ? "Enter the Category name" : ""}
                  type="text"
                  name="name"
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
                      <img src={url} className="w-1/6 object-cover" alt="img" />
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
              Create Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CategoryNewPage;
