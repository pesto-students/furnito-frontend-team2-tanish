import { IconContext } from "react-icons";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useMemo } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
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
    name: "Stock",
    sortable: true,
    selector: (row: { Stock: number }) => row.Stock,
  },
  {
    name: "Price (₹)",
    sortable: true,
    selector: (row: { Price: number }) => row.Price,
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
    Name: "Sofa",
    Stock: "5",
    Price: "2000",
  },
  {
    Id: 2,
    Name: "Chair",
    Stock: "10",
    Price: "1000",
  },
  {
    Id: 3,
    Name: "Table",
    Stock: "15",
    Price: "3000",
  },
  {
    Id: 4,
    Name: "Bed",
    Stock: "20",
    Price: "4000",
  },
  {
    Id: 5,
    Name: "Cupboard",
    Stock: "25",
    Price: "5000",
  },
  {
    Id: 11,
    Name: "Sofa",
    Stock: "5",
    Price: "2000",
  },
  {
    Id: 21,
    Name: "Chair",
    Stock: "10",
    Price: "1000",
  },
  {
    Id: 31,
    Name: "Table",
    Stock: "15",
    Price: "3000",
  },
  {
    Id: 41,
    Name: "Bed",
    Stock: "20",
    Price: "4000",
  },
  {
    Id: 51,
    Name: "Cupboard",
    Stock: "25",
    Price: "5000",
  },
  {
    Id: 12,
    Name: "Sofa",
    Stock: "5",
    Price: "2000",
  },
  {
    Id: 22,
    Name: "Chair",
    Stock: "10",
    Price: "1000",
  },
  {
    Id: 32,
    Name: "Table",
    Stock: "15",
    Price: "3000",
  },
  {
    Id: 42,
    Name: "Bed",
    Stock: "20",
    Price: "4000",
  },
  {
    Id: 52,
    Name: "Cupboard",
    Stock: "25",
    Price: "5000",
  },
  {
    Id: 13,
    Name: "Sofa",
    Stock: "5",
    Price: "2000",
  },
  {
    Id: 23,
    Name: "Chair",
    Stock: "10",
    Price: "1000",
  },
  {
    Id: 33,
    Name: "Table",
    Stock: "15",
    Price: "3000",
  },
  {
    Id: 43,
    Name: "Bed",
    Stock: "20",
    Price: "4000",
  },
  {
    Id: 53,
    Name: "Cupboard",
    Stock: "25",
    Price: "5000",
  },
];

function ProductsComponent() {
  const navigate = useNavigate();

  const subHeaderComponentMemo = useMemo(() => {}, []);
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

export default ProductsComponent;
