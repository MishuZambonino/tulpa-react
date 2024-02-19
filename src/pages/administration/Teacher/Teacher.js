import React, { useContext, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../../../App";
import { classNames } from "primereact/utils";
import {
  addTeacher,
  getAllTeachers,
  listenTeachers,
} from "../../../services/firebase/collection/teacher";
import { TEACHER_PAGE } from "../../../constants/routes";
import Table from "../../../components/Table";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./components/teacher.scss";
import { values } from "pg/lib/native/query";
import TeacherModal from "./components/TeacherModal";
import { Checkbox } from "primereact/checkbox";

const Teacher = () => {
  const { user } = useContext(AuthContext);
  const [teacher, setTeacher] = useState({
    id: "",
    name: "",
    active: true,
  });
  const [teachers, setTeachers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const teachersFetched = await getAllTeachers();
      return { teachersFetched };
    }

    fetchData()
      .then((data) => {
        const { teachersFetched } = data;
        setTeachers(teachersFetched.docs.map((d) => d.data()));
      })
      .catch((error) => {
        console.log(error);
      });
    listenTeacherChange();
  }, []);

  const listenTeacherChange = () => {
    listenTeachers((teachersFetched) => {
      setTeachers(teachersFetched.docs.map((d) => d.data()));
      console.log(teachersFetched);
    });
  };

  const openNew = () => {
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
    setSubmitted(false);
    setShowDialog(true);
  };
  const hideDialog = () => {
    setSubmitted(false);
    setShowDialog(false);
  };
  const editTeacher = (teacher) => {
    setTeacher({ ...teacher });
    setShowDialog(true);
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editTeacher(rowData)}
        />
      </>
    );
  };
  const activeBodyTemplate = (status) => {
    return <Checkbox disabled />;
  };
  return (
    <>
      <Table
        data={teachers}
        rows={10}
        dataKey="id"
        emptyMessage="No existen registros"
        tableName="Profesores"
        setGlobalFilter={setGlobalFilter}
        openNew={openNew}
      >
        <Column field="name" header="Nombre" sortable />
        <Column field="lastname" header="Apellido" sortable />
        <Column field="active" header="Activo" body={activeBodyTemplate} />
        <Column body={actionBodyTemplate}></Column>
      </Table>
      <TeacherModal
        showDialog={showDialog}
        teacherEdit={teacher}
        hideDialog={hideDialog}
      />
    </>
  );
};

export default Teacher;
