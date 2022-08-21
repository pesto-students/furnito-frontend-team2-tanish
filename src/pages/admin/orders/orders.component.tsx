import { useState } from "react";
import axios from "axios";

function OrdersComponent() {
  const [imageSelected, setImageSelected] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function uploadImage() {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ml_default");
    axios
      .post("https://api.cloudinary.com/v1_1/dh8fzzd4h/image/upload", formData)
      .then((res) => {
        if (res.status === 200) {
          setImageUrl(res.data.secure_url);
        }
      });
  }

  return (
    <div className="ml-auto pt-6 mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
      <div className="sticky top-0 h-16 border-b bg-white lg:py-2.5">
        <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
          <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
            Orders
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
      <div className="px-6 pt-6 2xl:container">
        <div className="flex justify-center items-center h-[80vh]">
          <input
            type="file"
            accept="image/jpg,.gif,.png,.svg,.webp"
            onChange={(event) => {
              // @ts-ignore
              setImageSelected(event.target.files[0]);
            }}
          />
          <button
            onClick={() => uploadImage()}
            type="button"
            className="focus:outline-none text-white bg-primary-400 hover:bg-primary-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus:ring-primary-500"
          >
            UPLOAD
          </button>
          <img src={imageUrl} alt="" />
        </div>
      </div>
    </div>
  );
}

export default OrdersComponent;
