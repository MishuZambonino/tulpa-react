import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import "./style.scss";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import SideBarMenu from "../../components/SideBarMenu";

const Table = ({
  children,
  data,
  tableName,
  rows,
  dataKey,
  emptyMessage,
  globalFilter,
  setGlobalFilter,
  openNew,
  ...props
}) => {
  const renderHeader = () => {
    return (
      <div className="table-header">
        {tableName}
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(event) => setGlobalFilter(event.target.value)}
            placeholder="Buscar"
          />
        </span>
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <>
        <Button
          label="Nuevo"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
      </>
    );
  };
    const leftToolbarTemplate = () => {
        return (
            <SideBarMenu/>
        );
    };

  const header = renderHeader();

  return (
    <div className="card">
        <Toolbar className="p-mb-4" right={rightToolbarTemplate} left={leftToolbarTemplate}/>
      <DataTable
        value={data}
        header={header}
        className="p-datatable-customers"
        dataKey={dataKey}
        paginator
        rows={rows}
        emptyMessage={emptyMessage}
        globalFilter={globalFilter}
        currentPageReportTemplate="{first} - {last} de {totalRecords} registros"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
        {...props}
      >
        {children}
      </DataTable>
    </div>
  );
};
export default Table;
