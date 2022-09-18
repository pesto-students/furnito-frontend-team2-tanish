import React from "react";
import { FiArrowDown } from "react-icons/fi";
import DataTable from "react-data-table-component";

const sortIcon = <FiArrowDown />;

function DataTableBase(props: any): JSX.Element {
  return (
    <DataTable
      pagination
      selectableRowsComponentProps={false}
      sortIcon={sortIcon}
      fixedHeader
      fixedHeaderScrollHeight="550px"
      {...props}
    />
  );
}

export default DataTableBase;
