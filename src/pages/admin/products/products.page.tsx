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
  selectedProduct,
} from "../../../features/product/product-slice";

function ProductsPage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, paginatedSortData, products } =
    useAppSelector(selectedProduct);

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
    <div className="flex flex-wrap mt-4">
      <div className="w-full mb-12 px-4 mx-8 -my-16">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
                <h5 className="text-2xl text-gray-600 font-medium lg:block">
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
          </div>
          <div className="block w-full overflow-x-auto">
            <div className="justify-center items-center">
              <DataTableBase
                className="items-center w-full bg-transparent border-collapse"
                columns={columns}
                data={data}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
