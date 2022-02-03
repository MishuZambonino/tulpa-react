import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { addFloor } from "../../../../services/firebase/collection/floor";
import { Button } from "primereact/button";
import { generateId } from "../../../../utils/generateId";

const FloorModal = ({ hideDialog, floorEdit, showDialog }) => {
  const [floor, setFloor] = useState({
    id: "",
    number: 0,
    active: true,
  });
  const toast = useRef(null);

  useEffect(() => {
    setFloor({
      ...floorEdit,
      id: floorEdit.id ? floorEdit.id : generateId(),
    });
  }, [floorEdit]);

  const saveFloor = async () => {
    try {
      const response = await addFloor(floor, floor.id);
      console.log(response);
      hideDialog();
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Piso guardado con éxito",
        life: 3000,
      });
      setFloor({
        id: "",
        number: 0,
        active: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditFloor = (event) => {
    const { name, value } = event.target;
    const floorCopy = { ...floor };
    floorCopy[name] = value;
    setFloor(floorCopy);
    console.log(floor);
  };
  const handleCheckChange = (event) => {
    const { checked, value } = event;
    const floorCopy = { ...floor };
    floorCopy[value] = checked;
    setFloor(floorCopy);
    console.log(floor);
  };

  const floorDialogFooter = (
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
        onClick={saveFloor}
      />
    </React.Fragment>
  );

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={showDialog}
        style={{ width: "450px" }}
        header="Detalles del Piso"
        modal
        className="p-fluid"
        footer={floorDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="name">Piso:</label>
          <InputText
            id="number"
            name="number"
            value={floor.number}
            onChange={handleEditFloor}
            required
            autoFocus
            // className={classNames({
            //   "p-invalid": submitted && !floor.name,
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
              checked={floor.active}
              onChange={handleCheckChange}
            />
            <label htmlFor="active">Activo</label>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default FloorModal;
