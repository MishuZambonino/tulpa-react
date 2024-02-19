import React, { useContext, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../../../App";
import { classNames } from "primereact/utils";
import {
  addFloor,
  getAllFloors,
  listenFloors,
} from "../../../services/firebase/collection/floor";
import { SCHEDULE_PAGE } from "../../../constants/routes";
import Table from "../../../components/Table";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./components/schedule.scss";
import { values } from "pg/lib/native/query";
import ScheduleModal from "./components/ScheduleModal";
import { Checkbox } from "primereact/checkbox";

const Schedule = () => {
  const { user } = useContext(AuthContext);
  const [floor, setFloor] = useState({
    id: "",
    number: 0,
    active: true,
  });
  const [floors, setFloors] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const floorsFetched = await getAllFloors();
      return { floorsFetched };
    }

    fetchData()
      .then((data) => {
        const { floorsFetched } = data;
        setFloors(floorsFetched.docs.map((d) => d.data()));
      })
      .catch((error) => {
        console.log(error);
      });
    listenFloorChange();
  }, []);

  const listenFloorChange = () => {
    listenFloors((floorsFetched) => {
      setFloors(floorsFetched.docs.map((d) => d.data()));
      console.log(floorsFetched);
    });
  };

  const openNew = () => {
    setFloor({
      id: "",
      number: 0,
      active: true,
    });
    setSubmitted(false);
    setShowDialog(true);
  };
  const hideDialog = () => {
    setSubmitted(false);
    setShowDialog(false);
  };
  const editFloor = (floor) => {
    setFloor({ ...floor });
    setShowDialog(true);
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editFloor(rowData)}
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
        data={floors}
        rows={10}
        dataKey="id"
        emptyMessage="No existen registros"
        tableName="Horarios"
        setGlobalFilter={setGlobalFilter}
        openNew={openNew}
      >
        <Column field="number" header="Horario" sortable />
        <Column field="active" header="Activo" body={activeBodyTemplate} />
        <Column body={actionBodyTemplate}></Column>
      </Table>
      <ScheduleModal
        showDialog={showDialog}
        floorEdit={floor}
        hideDialog={hideDialog}
      />
    </>
  );
};

export default Schedule;
