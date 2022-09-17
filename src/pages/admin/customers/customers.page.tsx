import { HiOutlineTrash } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import DataTableBase from "../../../components/data-table/data-table.component";
import authService from "../../../features/auth/services/auth.service";
import { PaginatedSortModel } from "../../../features/product/models/paginated-sort-model";

function CustomersPage() {
  const [users, setUsers] = useState(Array<any>());
  const [totalRows, setTotalRows] = useState(0);
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
        <HiOutlineTrash
          color="#FFA62F"
          fontSize="1.2rem"
          onClick={() => handleButtonClick(row._id, "delete")}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const getCustomers = async () => {
    authService
      .fetchCustomers(paginatedSortModel)
      .then((res: any) => {
        setUsers((prevState) => [...prevState, ...res.users]);
        setTotalRows((prevState) => prevState + res.total);
      })
      .catch((err: any) => {
        throw new Error(err);
      });
  };

  const handlePageChange = (page: number) => {
    paginatedSortModel.page = page;
    return getCustomers();
  };

  const handlePerRowsChange = (perPage: number) => {
    paginatedSortModel.limit = perPage;
    return getCustomers();
  };

  useEffect(() => {
    document.title = "Customers";
    getCustomers();
  }, []);

  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full mb-12 px-4 mx-8 -my-16">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="flex items-center justify-between space-x-4 2xl:container">
                <h5 className="text-2xl text-gray-600 font-medium lg:block">
                  Customers
                </h5>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <div className="justify-center items-center">
              <DataTableBase
                className="items-center w-full bg-transparent border-collapse"
                columns={columns}
                data={users}
                totalRows={totalRows}
                handlePageChange={handlePageChange}
                handlePerRowsChange={handlePerRowsChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomersPage;
