import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { addOcupation } from "../../../../services/firebase/collection/ocupation";
import { Button } from "primereact/button";
import { generateId } from "../../../../utils/generateId";

const OcupationModal = ({ hideDialog, ocupationEdit, showDialog }) => {
  const [ocupation, setOcupation] = useState({
    id: "",
    name: "",
    active: true,
  });
  const toast = useRef(null);

  useEffect(() => {
    setOcupation({
      ...ocupationEdit,
      id: ocupationEdit.id ? ocupationEdit.id : generateId(),
    });
  }, [ocupationEdit]);

  const saveOcupation = async () => {
    try {
      const response = await addOcupation(ocupation, ocupation.id);
      console.log(response);
      hideDialog();
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Ocupación guardada con éxito",
        life: 3000,
      });
      setOcupation({
        id: "",
        name: "",
        active: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditOcupation = (event) => {
    const { name, value } = event.target;
    const ocupationCopy = { ...ocupation };
    ocupationCopy[name] = value;
    setOcupation(ocupationCopy);
    console.log(ocupation);
  };
  const handleCheckChange = (event) => {
    const { checked, value } = event;
    const ocupationCopy = { ...ocupation };
    ocupationCopy[value] = checked;
    setOcupation(ocupationCopy);
    console.log(ocupation);
  };

  const ocupationDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveOcupation}
      />
    </React.Fragment>
  );

  return (
    <>
      <Toast ref={toast} />
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
              value="active"
              checked={ocupation.active}
              onChange={handleCheckChange}
            />
            <label htmlFor="active">Activo</label>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default OcupationModal;
