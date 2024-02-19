import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { addUniversity } from "../../../../services/firebase/collection/university";
import { Button } from "primereact/button";
import { generateId } from "../../../../utils/generateId";

const BalanceModal = ({ hideDialog, universityEdit, showDialog }) => {
  const [university, setUniversity] = useState({
    id: "",
    name: "",
    active: true,
  });
  const toast = useRef(null);

  useEffect(() => {
    setUniversity({
      ...universityEdit,
      id: universityEdit.id ? universityEdit.id : generateId(),
    });
  }, [universityEdit]);

  const saveUniversity = async () => {
    try {
      const response = await addUniversity(university, university.id);
      console.log(response);
      hideDialog();
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Universidad guardada con éxito",
        life: 3000,
      });
      setUniversity({
        id: "",
        name: "",
        active: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditUniversity = (event) => {
    const { name, value } = event.target;
    const universityCopy = { ...university };
    universityCopy[name] = value;
    setUniversity(universityCopy);
    console.log(university);
  };
  const handleCheckChange = (event) => {
    const { checked, value } = event;
    const universityCopy = { ...university };
    universityCopy[value] = checked;
    setUniversity(universityCopy);
    console.log(university);
  };

  const universityDialogFooter = (
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
        onClick={saveUniversity}
      />
    </React.Fragment>
  );

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={showDialog}
        style={{ width: "450px" }}
        header="Detalles de la Universidad"
        modal
        className="p-fluid"
        footer={universityDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="name">Universidad:</label>
          <InputText
            id="name"
            name="name"
            value={university.name}
            onChange={handleEditUniversity}
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
          <div className="p-formgrid p-grid flex align-items-center">
            <Checkbox
              inputId="active"
              value="active"
              checked={university.active}
              onChange={handleCheckChange}
            />
            <label htmlFor="active" className="ml-2">Activo</label>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default BalanceModal;
