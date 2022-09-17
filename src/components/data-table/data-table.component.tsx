import React from "react";
import { FiArrowDown } from "react-icons/fi";
import DataTable from "react-data-table-component";

const sortIcon = <FiArrowDown />;

function DataTableBase(props: any): JSX.Element {
  const { totalRows, handlePageChange, handlePerRowsChange, pending } = props;
  return (
    <DataTable
      pagination
      paginationServer
      progressPending={pending}
      paginationTotalRows={totalRows}
      selectableRowsComponentProps={false}
      onChangePage={handlePageChange}
      onChangeRowsPerPage={handlePerRowsChange}
      sortIcon={sortIcon}
      fixedHeader
      fixedHeaderScrollHeight="550px"
      {...props}
    />
  );
}

export default DataTableBase;
