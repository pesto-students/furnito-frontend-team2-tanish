import { InputLabel, TextField } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux/hooks";
import { selectedProduct } from "../../features/product/product-slice";

export default function AddressForm(props: { handleChange: any }) {
  const { order } = useAppSelector(selectedProduct);
  const { handleChange } = props;
  const navigate = useNavigate();
  const navigateToPayment = () => {
    navigate("/checkout/payment");
  };

  return (
    <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
          Shipping Address
        </h1>
        <form className="space-y-4 md:space-y-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputLabel htmlFor="name">Name</InputLabel>
              <TextField
                fullWidth
                value={order?.shippingInfo.name}
                onChange={handleChange("name")}
                type="name"
                name="name"
                id="name"
                variant="outlined"
                size="small"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputLabel htmlFor="phoneNo">Phone</InputLabel>
              <TextField
                fullWidth
                value={order?.shippingInfo.phoneNo}
                onChange={handleChange("phoneNo")}
                type="phoneNo"
                name="phoneNo"
                id="phoneNo"
                variant="outlined"
                size="small"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <InputLabel htmlFor="address">Address</InputLabel>
              <TextField
                fullWidth
                value={order?.shippingInfo.address}
                onChange={handleChange("address")}
                type="area"
                name="address"
                id="address"
                variant="outlined"
                size="small"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputLabel htmlFor="city">City</InputLabel>
              <TextField
                fullWidth
                value={order?.shippingInfo.city}
                onChange={handleChange("city")}
                type="text"
                name="city"
                id="city"
                variant="outlined"
                size="small"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputLabel htmlFor="state">State</InputLabel>
              <TextField
                fullWidth
                value={order?.shippingInfo.state}
                onChange={handleChange("state")}
                type="text"
                name="state"
                id="state"
                variant="outlined"
                size="small"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputLabel htmlFor="pincode">Pin Code</InputLabel>
              <TextField
                fullWidth
                value={order?.shippingInfo.pinCode}
                onChange={handleChange("pinCode")}
                type="number"
                name="pinCode"
                id="pinCode"
                variant="outlined"
                size="small"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputLabel htmlFor="phone">Country</InputLabel>
              <TextField
                fullWidth
                value={order?.shippingInfo.country}
                onChange={handleChange("country")}
                type="text"
                name="country"
                id="country"
                variant="outlined"
                size="small"
              />
            </div>
          </div>
          <button
            onClick={() => navigateToPayment()}
            type="submit"
            className="w-full text-white bg-primary-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Continue
          </button>
          <p className="text-sm font-light text-secondary-100">
            Want to update the items?{" "}
            <Link
              to="/cart"
              className="font-medium text-primary-400 hover:underline"
            >
              Back to Cart
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
