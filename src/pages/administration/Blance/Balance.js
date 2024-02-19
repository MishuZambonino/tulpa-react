import React, { useContext, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../../../App";
import { classNames } from "primereact/utils";
import {
  addUniversity,
  getAllUniversities,
  listenUniversities,
} from "../../../services/firebase/collection/university";
import { BALANCE_PAGE } from "../../../constants/routes";
import Table from "../../../components/Table";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./components/balance.scss";
import { values } from "pg/lib/native/query";
import BalanceModal from "./components/BalanceModal";
import { Checkbox } from "primereact/checkbox";

const Balance = () => {
  const { user } = useContext(AuthContext);
  const [university, setUniversity] = useState({
    id: "",
    name: "",
    active: true,
  });
  const [universities, setUniversities] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const universitiesFetched = await getAllUniversities();
      return { universitiesFetched };
    }

    fetchData()
      .then((data) => {
        const { universitiesFetched } = data;
        setUniversities(universitiesFetched.docs.map((d) => d.data()));
      })
      .catch((error) => {
        console.log(error);
      });
    listenUniversityChange();
  }, []);

  const listenUniversityChange = () => {
    listenUniversities((universitiesFetched) => {
      setUniversities(universitiesFetched.docs.map((d) => d.data()));
      console.log(universitiesFetched);
    });
  };

  const openNew = () => {
    setUniversity({
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
  const editUniversity = (university) => {
    setUniversity({ ...university });
    setShowDialog(true);
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editUniversity(rowData)}
        />
      </>
    );
  };
  const activeBodyTemplate = () => {
    return <Checkbox disabled />;
  };
  return (
    <>
      <Table
        data={universities}
        rows={10}
        dataKey="id"
        emptyMessage="No existen registros"
        tableName="Balance"
        setGlobalFilter={setGlobalFilter}
        openNew={openNew}
      >
        <Column field="name" header="Descripción" sortable />
        <Column field="active" header="Valor" body={activeBodyTemplate} />
        <Column body={actionBodyTemplate}></Column>
      </Table>
      <BalanceModal
        showDialog={showDialog}
        universityEdit={university}
        hideDialog={hideDialog}
      />
    </>
  );
};

export default Balance;
