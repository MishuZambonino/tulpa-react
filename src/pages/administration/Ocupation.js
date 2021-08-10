import React, { useContext, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../../App";
import SideBarMenu from "../../components/SideBarMenu";
import {
  addOcupation,
  getAllOcupations,
} from "../../services/firebase/collection/ocupation";
import { OCUPATION_PAGE } from "../../constants/routes";
import Table from "../../components/Table";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";

const Ocupation = () => {
  const { user } = useContext(AuthContext);
  const [ocupation, setOcupation] = useState({
    id: "",
    name: "",
    active: true,
  });
  const [ocupations, setOcupations] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [ocupationDialog, setOcupationDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editOcupation(rowData)}
        />
      </React.Fragment>
    );
  };

  useEffect(() => {
    async function fetchData() {
      const ocupationsFetched = await getAllOcupations();
      return { ocupationsFetched };
    }

    fetchData()
      .then((data) => {
        const { ocupationsFetched } = data;
        setOcupations(ocupationsFetched.docs.map((d) => d.data()));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const openNew = () => {
    setSubmitted(false);
    setOcupationDialog(true);
  };
  const hideDialog = () => {
    setSubmitted(false);
    setOcupationDialog(false);
  };

  const ocupationDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button label="Save" icon="pi pi-check" className="p-button-text" />
    </React.Fragment>
  );

  const editOcupation = (ocupation) => {
    setOcupation({ ...ocupation });
    setOcupationDialog(true);
  };
  const createOcupation = async (event) => {
    try {
      const response = await addOcupation(ocupation);
      console.log("Se supone que se guardo");
    } catch (error) {
      console.log(error);
    }
    event.preventDefault();
  };

  return (
    <>
      <SideBarMenu />
      <Table
        data={ocupations}
        rows={10}
        dataKey="id"
        emptyMessage="No hay el texto"
        tableName="Ocupaciones"
        setGlobalFilter={setGlobalFilter}
      >
        <Column field="name" header="Ocupación" sortable />
        <Column field="id" header="Estado" sortable />
        <Column body={actionBodyTemplate}></Column>
      </Table>
      <Dialog
        visible={ocupationDialog}
        style={{ width: "450px" }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={ocupationDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="name">Ocupación</label>
          <InputText
            id="name"
            //value={product.name}
            //onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            //className={classNames({ "p-invalid": submitted && !product.name })}
          />
          {submitted && !product.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="p-field">
          <label className="p-mb-3">Category</label>
          <div className="p-formgrid p-grid">
            <Checkbox inputId="category1" name="category" value="Accessories" />
            <label htmlFor="category1">Accessories</label>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Ocupation;
