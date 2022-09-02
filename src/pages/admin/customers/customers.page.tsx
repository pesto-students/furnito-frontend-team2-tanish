import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import DataTableBase from "../../../components/data-table/data-table.component";
import authService from "../../../features/auth/services/auth.service";
import { PaginatedSortModel } from "../../../features/product/models/paginated-sort-model";

function CustomersPage() {
  const [data, setData] = useState([]);
  const paginatedSortModel: PaginatedSortModel = {
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  };

  function handleButtonClick(_id: any, edit: string) {
    console.log(_id, edit);
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
      name: "Email",
      sortable: true,
      selector: (row: { email: string }) => row.email,
    },
    {
      name: "Role",
      sortable: true,
      selector: (row: { role: string }) => row.role,
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
    document.title = "Customers";
    authService
      .fetchCustomers(paginatedSortModel)
      .then((res: any) => {
        setData(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="ml-auto pt-6 mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
      <div className="sticky top-0 h-16 border-b bg-white lg:py-2.5">
        <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
          <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
            Customers
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
        <div className="justify-center items-center">
          <DataTableBase columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}

export default CustomersPage;
