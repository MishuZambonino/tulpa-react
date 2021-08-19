import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { addOcupation } from "../../../../services/firebase/collection/ocupation";
import { Button } from "primereact/button";

const OcupationModal = ({ hideDialog, ocupationEdit, showDialog }) => {
  const [ocupation, setOcupation] = useState({
    id: "",
    name: "",
    active: true,
  });

  useEffect(() => {
    setOcupation({ ...ocupationEdit });
  }, [ocupationEdit]);

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
  const handleEditOcupation = (event) => {
    const { name, value } = event.target;
    const ocupationCopy = { ...ocupation };
    ocupationCopy[name] = value;
    setOcupation(ocupationCopy);
    console.log(event);
  };
  return (
    <Dialog
      visible={showDialog}
      style={{ width: "450px" }}
      header="Detalles de la Ocupación"
      modal
      className="p-fluid"
      footer={ocupationDialogFooter}
      onHide={hideDialog}
    >
      <div className="p-field">
        <label htmlFor="name">Ocupación:</label>
        <InputText
          id="name"
          name="name"
          value={ocupation.name}
          onChange={handleEditOcupation}
          required
          autoFocus
          // className={classNames({
          //   "p-invalid": submitted && !ocupation.name,
          // })}
        />
        {/*{submitted && !product.name && (*/}
        {/*  <small className="p-error">Name is required.</small>*/}
        {/*)}*/}
      </div>
      <div className="p-field">
        <div className="p-formgrid p-grid">
          <Checkbox
            inputId="active"
            // checked={isActive}
            // onChange={(event) => setIsActive(event.target.value)}
          />
          <label htmlFor="active">Activo</label>
        </div>
      </div>
    </Dialog>
  );
};
export default OcupationModal;
