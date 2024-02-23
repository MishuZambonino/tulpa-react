import React, { useContext, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../../../App";
import { classNames } from "primereact/utils";
import {
  addStudent,
  getAllStudents,
  listenStudents,
} from "../../../services/firebase/collection/student";
import { STUDENT_PAGE } from "../../../constants/routes";
import Table from "../../../components/Table";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./components/student.scss";
import { values } from "pg/lib/native/query";
import StudentModal from "./components/StudentModal";
import { Checkbox } from "primereact/checkbox";

const Student = () => {
  const { user } = useContext(AuthContext);
  const [student, setStudent] = useState({
    id: "",
    name: "",
    active: true,
  });
  const [students, setStudents] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const studentsFetched = await getAllStudents();
      return { studentsFetched };
    }

    fetchData()
        .then((data) => {
          const { studentsFetched } = data;
          setStudents(studentsFetched.docs.map((d) => d.data()));
        })
        .catch((error) => {
          console.log(error);
        });
    listenStudentChange();
  }, []);

  const listenStudentChange = () => {
    listenStudents((studentsFetched) => {
      setStudents(studentsFetched.docs.map((d) => d.data()));
      console.log(studentsFetched);
    });
  };

  const openNew = () => {
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
    setSubmitted(false);
    setShowDialog(true);
  };
  const hideDialog = () => {
    setSubmitted(false);
    setShowDialog(false);
  };
  const editStudent = (student) => {
    setStudent({ ...student });
    setShowDialog(true);
  };
  const actionBodyTemplate = (rowData) => {
    return (
        <>
          <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-success p-mr-2"
              onClick={() => editStudent(rowData)}
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
            data={students}
            rows={10}
            dataKey="id"
            emptyMessage="No existen registros"
            tableName="Estudiantes"
            setGlobalFilter={setGlobalFilter}
            openNew={openNew}
        >
          <Column field="name" header="Nombre" sortable />
          <Column field="lastname" header="Apellido" sortable />
          <Column field="active" header="Activo" body={activeBodyTemplate} />
          <Column body={actionBodyTemplate}></Column>
        </Table>
        <StudentModal
            showDialog={showDialog}
            studentEdit={student}
            hideDialog={hideDialog}
        />
      </>
  );
};

export default Student;
