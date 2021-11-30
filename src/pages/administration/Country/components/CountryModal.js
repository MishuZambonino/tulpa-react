import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { addCountry } from "../../../../services/firebase/collection/country";
import { Button } from "primereact/button";
import { generateId } from "../../../../utils/generateId";
import { InputNumber } from "primereact/inputnumber";

const CountryModal = ({ hideDialog, countryEdit, showDialog }) => {
  const [country, setCountry] = useState({
    id: "",
    name: "",
    active: true,
  });
  const toast = useRef(null);

  useEffect(() => {
    setCountry({
      ...countryEdit,
      id: countryEdit.id ? countryEdit.id : generateId(),
    });
  }, [countryEdit]);

  const saveCountry = async () => {
    try {
      const response = await addCountry(country, country.id);
      console.log(response);
      hideDialog();
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "País guardado con éxito",
        life: 3000,
      });
      setCountry({
        id: "",
        name: "",
        active: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditCountry = (event) => {
    const { name, value } = event.target;
    const countryCopy = { ...country };
    countryCopy[name] = value;
    setCountry(countryCopy);
    console.log(country);
  };
  const handleCheckChange = (event) => {
    const { checked, value } = event;
    const countryCopy = { ...country };
    countryCopy[value] = checked;
    setCountry(countryCopy);
    console.log(country);
  };

  const countryDialogFooter = (
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
        onClick={saveCountry}
      />
    </React.Fragment>
  );

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={showDialog}
        style={{ width: "450px" }}
        header="Detalles del País"
        modal
        className="p-fluid"
        footer={countryDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="name">País:</label>
          <InputText
            id="name"
            name="name"
            value={country.name}
            onChange={handleEditCountry}
            required
            autoFocus
          />
        </div>
        <div className="p-field">
          <div className="p-formgrid p-grid">
            <Checkbox
              inputId="active"
              value="active"
              checked={country.active}
              onChange={handleCheckChange}
            />
            <label htmlFor="active">Activo</label>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default CountryModal;
