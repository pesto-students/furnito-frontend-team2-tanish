import React, { useEffect, useState } from "react";
import {
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";
import { CircularProgress } from "@mui/material";
import DataTableBase from "../../../components/data-table/data-table.component";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import {
  fetchOrders,
  selectedProduct,
} from "../../../features/product/product-slice";
import { DisplayUser } from "../../../features/auth/models/display-user.model";

function OrdersPage() {
  const [data, setData] = useState([]);
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, paginatedSortData, orders } =
    useAppSelector(selectedProduct);

  function handleButtonClick(id: any, action: string) {
    if (action === "delete") {
      // dispatch(deleteProduct(id));
    }
  }

  const columns = [
    {
      name: "Id",
      sortable: true,
      selector: (row: { _id: string }) => row._id,
    },
    {
      name: "Email",
      sortable: true,
      selector: (row: { user: DisplayUser }) => row.user.email,
    },
    {
      name: "Total(₹)",
      sortable: true,
      selector: (row: { total: string }) => row.total,
    },
    {
      name: "Status",
      sortable: true,
      selector: (row: { status: string }) => row.status,
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
          <HiOutlineEye
            color="#77dd77"
            fontSize="1.2rem"
            onClick={() => handleButtonClick(row._id, "view")}
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
    document.title = "Orders";
    dispatch(fetchOrders(paginatedSortData));
  }, []);

  if (isSuccess) {
    // @ts-ignore
    setTimeout(() => setData(orders), 0);
  }

  if (isLoading)
    return <CircularProgress sx={{ marginTop: "64px" }} color="primary" />;

  return (
    <div className="ml-auto pt-6 mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
      <div className="sticky top-0 h-16 border-b bg-white lg:py-2.5">
        <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
          <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
            Orders
          </h5>
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

export default OrdersPage;
