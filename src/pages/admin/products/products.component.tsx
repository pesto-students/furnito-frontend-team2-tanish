import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DataTableBase from "../../../components/data-table/data-table.component";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import {
  deleteProduct,
  fetchProducts,
  reset,
} from "../../../features/product/product-slice";

function ProductsComponent() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, paginatedSortData, products } = useAppSelector(
    (state) => state.product,
  );

  function handleButtonClick(id: any, action: string) {
    if (action === "delete") {
      dispatch(deleteProduct(id));
    }
  }

  const columns = [
    {
      name: "Id",
      sortable: true,
      selector: (row: { _id: string }) => row._id,
    },
    {
      name: "Name",
      sortable: true,
      selector: (row: { name: number }) => row.name,
    },
    {
      name: "Stock",
      sortable: true,
      selector: (row: { stock: number }) => row.stock,
    },
    {
      name: "Price (₹)",
      sortable: true,
      selector: (row: { price: number }) => row.price,
    },
    {
      name: "Action",
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row: { _id: any }) => (
        <>
          <HiOutlinePencilAlt
            color="#3BB9FF"
            fontSize="1.2rem"
            onClick={() => handleButtonClick(row._id, "edit")}
          />
          <HiOutlineTrash
            color="#FFA62F"
            fontSize="1.2rem"
            onClick={() => handleButtonClick(row._id, "delete")}
          />
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    dispatch(fetchProducts(paginatedSortData));
  }, []);

  if (isSuccess) {
    // @ts-ignore
    setData(products);
    dispatch(reset());
  }

  if (isLoading)
    return <CircularProgress sx={{ marginTop: "64px" }} color="primary" />;

  return (
    <div className="ml-auto pt-6 mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
      <div className="sticky top-0 h-16 border-b bg-white lg:py-2.5">
        <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
          <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
            Products
          </h5>
          <button
            onClick={() => navigate("/admin/products/new")}
            type="button"
            className="text-white bg-primary-400 hover:bg-primary-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:ring-primary-400"
          >
            <AiOutlinePlusCircle className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>
      <div className="px-6 pt-6 2xl:container">
        <div className="justify-center items-center">
          <DataTableBase columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}

export default ProductsComponent;
