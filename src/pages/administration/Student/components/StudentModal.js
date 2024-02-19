import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Calendar } from 'primereact/calendar';
import { addStudent } from "../../../../services/firebase/collection/student";
import { Button } from "primereact/button";
import { generateId } from "../../../../utils/generateId";

const StudentModal = ({ hideDialog, studentEdit, showDialog }) => {
  const [student, setStudent] = useState({
    id: "",
    ci:"",
    name: "",
    lastname:"",
    birthDate:"",
    cellphoneNumber:"",
    email:"",
    highSchool:"",
    adress:"",
    parentName:"",
    parentCi:"",
    parentCellphoneNumber:"",
    parentEmail:"",
    aditionalName:"",
    adictionalCellphoneNumber:"",
    initDate:"",
    finishDate:"",
    cost:"",
    active: true,
  });
  const toast = useRef(null);

  useEffect(() => {
    setStudent({
      ...studentEdit,
      id: studentEdit.id ? studentEdit.id : generateId(),
    });
  }, [studentEdit]);

  const saveStudent = async () => {
    try {
      const response = await addStudent(student, student.id);
      console.log(response);
      hideDialog();
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Estudiante guardado con éxito",
        life: 3000,
      });
      setStudent({
        id: "",
        ci:"",
        name: "",
        lastname:"",
        birthDate:"",
        cellphoneNumber:"",
        email:"",
        highSchool:"",
        adress:"",
        parentName:"",
        parentCi:"",
        parentCellphoneNumber:"",
        parentEmail:"",
        aditionalName:"",
        adictionalCellphoneNumber:"",
        initDate:"",
        finishDate:"",
        cost:"",
        active: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditStudent = (event) => {
    const { name, value } = event.target;
    const studentCopy = { ...student };
    studentCopy[name] = value;
    setStudent(studentCopy);
    console.log(student);
  };

  const handleCheckChange = (event) => {
    const { checked, value } = event;
    const studentCopy = { ...student };
    studentCopy[value] = checked;
    setStudent(studentCopy);
    console.log(student);
  };

  const studentDialogFooter = (
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
        onClick={saveStudent}
      />
    </React.Fragment>
  );

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={showDialog}
        style={{ width: "450px" }}
        header="Datos del estudiante"
        modal
        className="p-fluid"
        footer={studentDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="ci">CI:</label>
          <InputText
              id="ci"
              name="ci"
              value={student.ci}
              onChange={handleEditStudent}
              keyfilter="int"
              required
              autoFocus
          />
        </div>
        <div className="p-field">
          <label htmlFor="lastname">Apellidos:</label>
          <InputText
            id="lastname"
            name="lastname"
            value={student.lastname}
            onChange={handleEditStudent}
            required
            autoFocus
          />
        </div>
        <div className="p-field">
          <label htmlFor="name">Nombres:</label>
          <InputText
              id="name"
              name="name"
              value={student.name}
              onChange={handleEditStudent}
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="birthDate">Fecha nacimiento:</label>
          <Calendar
              id="birthDate"
              name="birthDate"
              value={student.birthDate}
              onChange={handleEditStudent}
              showIcon
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="cellphoneNumber">Teléfono celular:</label>
          <InputText
              id="cellphoneNumber"
              name="cellphoneNumber"
              value={student.cellphoneNumber}
              onChange={handleEditStudent}
              keyfilter="int"
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="email">Correo electrónico:</label>
          <InputText
              id="email"
              name="email"
              type="email"
              value={student.email}
              onChange={handleEditStudent}
              keyfilter="email"
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="highSchool">Unidad Educativa:</label>
          <InputText
              id="highSchool"
              name="highSchool"
              value={student.highSchool}
              onChange={handleEditStudent}
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="adress">Dirección Domicilio:</label>
          <InputText
              id="adress"
              name="adress"
              value={student.adress}
              onChange={handleEditStudent}
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="parentName">Nombre representante:</label>
          <InputText
              id="parentName"
              name="parentName"
              value={student.parentName}
              onChange={handleEditStudent}
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="parentCi">CI representante:</label>
          <InputText
              id="parentCi"
              name="parentCi"
              value={student.parentCi}
              onChange={handleEditStudent}
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="parentCellphoneNumber">Teléfono representante:</label>
          <InputText
              id="parentCellphoneNumber"
              name="parentCellphoneNumber"
              value={student.parentCellphoneNumber}
              onChange={handleEditStudent}
              keyfilter="int"
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="parentEmail">Correo electrónico representante:</label>
          <InputText
              id="parentEmail"
              name="parentEmail"
              value={student.parentEmail}
              onChange={handleEditStudent}
              keyfilter="email"
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="aditionalName">Nombre adicional:</label>
          <InputText
              id="aditionalName"
              name="aditionalName"
              value={student.aditionalName}
              onChange={handleEditStudent}
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="adictionalCellphoneNumber">Teléfono adicional:</label>
          <InputText
              id="adictionalCellphoneNumber"
              name="adictionalCellphoneNumber"
              value={student.adictionalCellphoneNumber}
              onChange={handleEditStudent}
              keyfilter="int"
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="initDate">Fecha inicio curso:</label>
          <Calendar
              id="initDate"
              name="initDate"
              value={student.initDate}
              onChange={handleEditStudent}
              showIcon
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="finishDate">Fecha finalización curso:</label>
          <Calendar
              id="finishDate"
              name="finishDate"
              value={student.finishDate}
              onChange={handleEditStudent}
              showIcon
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="cost">Valor del curso:</label>
          <InputText
              id="cost"
              name="cost"
              value={student.cost}
              onChange={handleEditStudent}
              keyfilter="money"
              required
          />
        </div>
        <div className="flex flex-wrap justify-content">
          <div className="flex align-items-center">
            <Checkbox
              inputId="active"
              value="active"
              checked={student.active}
              onChange={handleCheckChange}
              className="ml-2"
            />
            <label htmlFor="active">Activo: </label>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default StudentModal;
