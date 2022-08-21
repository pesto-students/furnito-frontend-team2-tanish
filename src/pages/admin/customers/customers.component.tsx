import React, { useMemo } from "react";
import { IconContext } from "react-icons";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import DataTableBase from "../../../components/data-table/data-table.component";

function handleButtonClick(Id: any, action: any) {
  console.log(Id, action);
}

const columns = [
  {
    name: "Id",
    sortable: true,
    selector: (row: { Id: string }) => row.Id,
  },
  {
    name: "Name",
    sortable: true,
    selector: (row: { Name: number }) => row.Name,
  },
  {
    name: "Email",
    sortable: true,
    selector: (row: { Email: string }) => row.Email,
  },
  {
    name: "Role",
    sortable: true,
    selector: (row: { Role: string }) => row.Role,
  },
  {
    name: "Action",
    cell: (row: { Id: any }) => (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <IconContext.Provider value={{ color: "blue" }}>
        <HiOutlinePencilAlt
          color="#3BB9FF"
          fontSize="1.2rem"
          onClick={() => handleButtonClick(row, "edit")}
        />
        <HiOutlineTrash
          color="#FFA62F"
          fontSize="1.2rem"
          onClick={() => handleButtonClick(row, "delete")}
        />
      </IconContext.Provider>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

const data = [
  {
    Id: 1,
    Name: "Vasu",
    Email: "vasu@gmail.com",
    Role: "Admin",
  },
  {
    Id: 2,
    Name: "Tanish",
    Email: "tansih@gmail.com",
    Role: "User",
  },
  {
    Id: 3,
    Name: "Raj",
    Email: "raj@gmail.com",
    Role: "User",
  },
  {
    Id: 4,
    Name: "Rajesh",
    Email: "rajesh@gmail.com",
    Role: "User",
  },
  {
    Id: 5,
    Name: "Varun",
    Email: "varun@gmail.com",
    Role: "User",
  },
  {
    Id: 11,
    Name: "Vasu",
    Email: "vasu@gmail.com",
    Role: "Admin",
  },
  {
    Id: 21,
    Name: "Tanish",
    Email: "tansih@gmail.com",
    Role: "User",
  },
  {
    Id: 31,
    Name: "Raj",
    Email: "raj@gmail.com",
    Role: "User",
  },
  {
    Id: 41,
    Name: "Rajesh",
    Email: "rajesh@gmail.com",
    Role: "User",
  },
  {
    Id: 51,
    Name: "Varun",
    Email: "varun@gmail.com",
    Role: "User",
  },
];

function CustomersComponent() {
  const subHeaderComponentMemo = useMemo(() => {}, []);
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
          <DataTableBase
            columns={columns}
            data={data}
            subHeaderComponent={subHeaderComponentMemo}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomersComponent;
