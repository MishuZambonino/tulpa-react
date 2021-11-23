import React, { useContext, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../../../App";
import SideBarMenu from "../../../components/SideBarMenu";
import { classNames } from "primereact/utils";
import {
  addFloor,
  getAllFloors,
  listenFloors,
} from "../../../services/firebase/collection/floor";
import { FLOOR_PAGE } from "../../../constants/routes";
import Table from "../../../components/Table";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./components/floor.scss";
import { values } from "pg/lib/native/query";
import FloorModal from "./components/FloorModal";
import { Checkbox } from "primereact/checkbox";

const Floor = () => {
  const { user } = useContext(AuthContext);
  const [floor, setFloor] = useState({
    id: "",
    number: "",
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
      number: "",
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
  const activeBodyTemplate = () => {
    return <Checkbox disabled />;
  };
  return (
    <>
      <SideBarMenu />
      <Table
        data={floors}
        rows={10}
        dataKey="id"
        emptyMessage="No existen registros"
        tableName="Pisos"
        setGlobalFilter={setGlobalFilter}
        openNew={openNew}
      >
        <Column field="number" header="Piso" sortable />
        <Column field="active" header="Activo" body={activeBodyTemplate} />
        <Column body={actionBodyTemplate}></Column>
      </Table>
      <FloorModal
        showDialog={showDialog}
        floorEdit={floor}
        hideDialog={hideDialog}
      />
    </>
  );
};

export default Floor;
