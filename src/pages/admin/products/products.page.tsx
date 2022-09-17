import { HiOutlineTrash } from "react-icons/hi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTableBase from "../../../components/data-table/data-table.component";
import productService from "../../../features/product/services/product.service";
import { PaginatedSortModel } from "../../../features/product/models/paginated-sort-model";

function ProductsPage() {
  const [totalRows, setTotalRows] = useState(0);
  const [pending, setPending] = React.useState(true);
  const [products, setProducts] = useState(Array<any>());
  const navigate = useNavigate();
  const paginatedSortModel: PaginatedSortModel = {
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  };

  const getProducts = async () => {
    await productService
      .fetchProducts(paginatedSortModel)
      .then((res: any) => {
        setPending(false);
        setProducts([...res.products]);
        setTotalRows(res.total);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const deleteProductHandler = (id: string) => {
    productService
      .deleteProduct(id)
      .then((res: any) => {
        if (res.message === "Product deleted successfully") {
          const newProducts = products.filter((product) => product._id !== id);
          setProducts([...newProducts]);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handlePageChange = (page: number) => {
    paginatedSortModel.page = page;
    return getProducts();
  };

  const handlePerRowsChange = (perPage: number) => {
    paginatedSortModel.limit = perPage;
    return getProducts();
  };

  useEffect(() => {
    document.title = "Products";
    getProducts();
  }, []);

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
        <HiOutlineTrash
          color="#FFA62F"
          fontSize="1.2rem"
          onClick={() => deleteProductHandler(row._id)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full mb-12 px-4 -my-16">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center space-x-4">
                <h5 className="text-2xl text-gray-600 font-medium lg:block">
                  Products
                </h5>
              </div>
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
          <div className="block w-full overflow-x-auto">
            <div className="justify-center items-center">
              <DataTableBase
                className="items-center w-full bg-transparent border-collapse"
                columns={columns}
                data={products}
                totalRows={totalRows}
                pending={pending}
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

export default ProductsPage;
