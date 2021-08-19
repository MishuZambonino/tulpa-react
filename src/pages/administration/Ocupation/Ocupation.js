import React, { useContext, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../../../App";
import SideBarMenu from "../../../components/SideBarMenu";
import { classNames } from "primereact/utils";
import {
  addOcupation,
  getAllOcupations,
  listenOcupations,
} from "../../../services/firebase/collection/ocupation";
import { OCUPATION_PAGE } from "../../../constants/routes";
import Table from "../../../components/Table";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./components/ocupation.scss";
import { values } from "pg/lib/native/query";
import OcupationModal from "./components/OcupationModal";
import { Checkbox } from "primereact/checkbox";

const Ocupation = () => {
  const { user } = useContext(AuthContext);
  const [ocupation, setOcupation] = useState({
    id: "",
    name: "",
    active: true,
  });
  const [ocupations, setOcupations] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const ocupationsFetched = await getAllOcupations();
      return { ocupationsFetched };
    }

    fetchData()
      .then((data) => {
        const { ocupationsFetched } = data;
        setOcupations(ocupationsFetched.docs.map((d) => d.data()));
      })
      .catch((error) => {
        console.log(error);
      });
    listenOcupationChange();
  }, []);

  const listenOcupationChange = () => {
    listenOcupations((ocupationsFetched) => {
      setOcupations(ocupationsFetched.docs.map((d) => d.data()));
      console.log(ocupationsFetched);
    });
  };

  const openNew = () => {
    setOcupation({
      id: "",
      name: "",
      active: true,
    });
    setSubmitted(false);
    setShowDialog(true);
  };
  const hideDialog = () => {
    setSubmitted(false);
    setShowDialog(false);
  };
  const editOcupation = (ocupation) => {
    setOcupation({ ...ocupation });
    setShowDialog(true);
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editOcupation(rowData)}
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
        data={ocupations}
        rows={10}
        dataKey="id"
        emptyMessage="No existen registros"
        tableName="Ocupaciones"
        setGlobalFilter={setGlobalFilter}
        openNew={openNew}
      >
        <Column field="name" header="Ocupación" sortable />
        <Column field="active" header="Activo" body={activeBodyTemplate} />
        <Column body={actionBodyTemplate}></Column>
      </Table>
      <OcupationModal
        showDialog={showDialog}
        ocupationEdit={ocupation}
        hideDialog={hideDialog}
      />
    </>
  );
};

export default Ocupation;
