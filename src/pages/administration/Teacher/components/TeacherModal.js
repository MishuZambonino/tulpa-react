import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { addTeacher } from "../../../../services/firebase/collection/teacher";
import { Button } from "primereact/button";
import { generateId } from "../../../../utils/generateId";
import {Calendar} from "primereact/calendar";
import { Avatar } from 'primereact/avatar';

const TeacherModal = ({ hideDialog, teacherEdit, showDialog }) => {
  const [teacher, setTeacher] = useState({
    id: "",
    ci:"",
    name: "",
    lastname:"",
    birthDate:"",
    cellphoneNumber:"",
    education:"",
    initDate:"",
    finishDate:"",
    hoursDay:"",
    hoursWeek:"",
    hoursMonth:"",
    basePayment:"",
    active: true,
  });
  const toast = useRef(null);

  useEffect(() => {
    setTeacher({
      ...teacherEdit,
      id: teacherEdit.id ? teacherEdit.id : generateId(),
    });
  }, [teacherEdit]);

  const saveTeacher = async () => {
    try {
      const response = await addTeacher(teacher, teacher.id);
      console.log(response);
      hideDialog();
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Profesor guardado con éxito",
        life: 3000,
      });
      setTeacher({
        id: "",
        ci:"",
        name: "",
        lastname:"",
        birthDate:"",
        cellphoneNumber:"",
        education:"",
        initDate:"",
        finishDate:"",
        hoursDay:"",
        hoursWeek:"",
        hoursMonth:"",
        basePayment:"",
        active: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditTeacher = (event) => {
    const { name, value } = event.target;
    const teacherCopy = { ...teacher };
    teacherCopy[name] = value;
    setTeacher(teacherCopy);
    console.log(teacher);
  };
  const handleCheckChange = (event) => {
    const { checked, value } = event;
    const teacherCopy = { ...teacher };
    teacherCopy[value] = checked;
    setTeacher(teacherCopy);
    console.log(teacher);
  };

  const teacherDialogFooter = (
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
        onClick={saveTeacher}
      />
    </React.Fragment>
  );

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={showDialog}
        style={{ width: "450px" }}
        header="Detalles del Profesor"
        modal
        className="p-fluid"
        footer={teacherDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="ci">CI:</label>
          <InputText
              id="ci"
              name="ci"
              value={teacher.ci}
              onChange={handleEditTeacher}
              required
              autoFocus
          />
        </div>
        <div className="p-field">
          <label htmlFor="name">Nombre:</label>
          <InputText
            id="name"
            name="name"
            value={teacher.name}
            onChange={handleEditTeacher}
            required
          />
        </div>
        <div className="p-field">
          <label htmlFor="lastname">Apellido:</label>
          <InputText
              id="lastname"
              name="lastname"
              value={teacher.lastname}
              onChange={handleEditTeacher}
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="birthdate">Fecha nacimiento:</label>
          <Calendar
              id="birthdate"
              name="birthdate"
              value={teacher.birthDate}
              onChange={handleEditTeacher}
              showIcon
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="cellphoneNumber">Teléfono celular:</label>
          <InputText
              id="cellphoneNumber"
              name="cellphoneNumber"
              value={teacher.cellphoneNumber}
              onChange={handleEditTeacher}
              keyfilter="int"
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="education">Títulos:</label>
          <InputText
              id="education"
              name="education"
              value={teacher.education}
              onChange={handleEditTeacher}
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="initDate">Fecha inicio:</label>
          <Calendar
              id="initDate"
              name="initDate"
              value={teacher.initDate}
              onChange={handleEditTeacher}
              showIcon
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="finishDate">Fecha finalización:</label>
          <Calendar
              id="finishDate"
              name="finishDate"
              value={teacher.finishDate}
              onChange={handleEditTeacher}
              showIcon
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="hoursDay">Horas diarias:</label>
          <InputText
              id="hoursDay"
              name="hoursDay"
              value={teacher.hoursDay}
              onChange={handleEditTeacher}
              keyfilter="int"
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="hoursWeek">Horas semanales:</label>
          <InputText
              id="hoursWeek"
              name="hoursWeek"
              value={teacher.hoursWeek}
              onChange={handleEditTeacher}
              keyfilter="int"
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="hoursMonth">Horas mensuales:</label>
          <InputText
              id="hoursMonth"
              name="hoursMonth"
              value={teacher.hoursMonth}
              onChange={handleEditTeacher}
              keyfilter="int"
              required
          />
        </div>
        <div className="p-field">
          <label htmlFor="basePayment">Sueldo base:</label>
          <InputText
              id="basePayment"
              name="basePayment"
              value={teacher.basePayment}
              onChange={handleEditTeacher}
              keyfilter="int"
              required
          />
        </div>
        <div className="p-field">
          <div className="p-formgrid p-grid">
            <Checkbox
              inputId="active"
              value="active"
              checked={teacher.active}
              onChange={handleCheckChange}
            />
            <label htmlFor="active">Activo</label>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default TeacherModal;
