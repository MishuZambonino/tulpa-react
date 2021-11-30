import React, { useContext, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../../../App";
import SideBarMenu from "../../../components/SideBarMenu";
import { classNames } from "primereact/utils";
import {
  addCountry,
  getAllCountries,
  listenCountries,
} from "../../../services/firebase/collection/country";
import { COUNTRY_PAGE } from "../../../constants/routes";
import Table from "../../../components/Table";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./components/country.scss";
import { values } from "pg/lib/native/query";
import CountryModal from "./components/CountryModal";
import { Checkbox } from "primereact/checkbox";

const Country = () => {
  const { user } = useContext(AuthContext);
  const [country, setCountry] = useState({
    id: "",
    name: "",
    active: true,
  });
  const [countries, setCountries] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const countriesFetched = await getAllCountries();
      return { countriesFetched };
    }

    fetchData()
      .then((data) => {
        const { countriesFetched } = data;
        setCountries(countriesFetched.docs.map((d) => d.data()));
      })
      .catch((error) => {
        console.log(error);
      });
    listenCountryChange();
  }, []);

  const listenCountryChange = () => {
    listenCountries((countriesFetched) => {
      setCountries(countriesFetched.docs.map((d) => d.data()));
      console.log(countriesFetched);
    });
  };

  const openNew = () => {
    setCountry({
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
  const editCountry = (country) => {
    setCountry({ ...country });
    setShowDialog(true);
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editCountry(rowData)}
        />
      </>
    );
  };
  const activeBodyTemplate = (status) => {
    return <Checkbox disabled />;
  };
  return (
    <>
      <SideBarMenu />
      <Table
        data={countries}
        rows={10}
        dataKey="id"
        emptyMessage="No existen registros"
        tableName="Paises"
        setGlobalFilter={setGlobalFilter}
        openNew={openNew}
      >
        <Column field="name" header="País" sortable />
        <Column field="active" header="Activo" body={activeBodyTemplate} />
        <Column body={actionBodyTemplate}></Column>
      </Table>
      <CountryModal
        showDialog={showDialog}
        countryEdit={country}
        hideDialog={hideDialog}
      />
    </>
  );
};

export default Country;
