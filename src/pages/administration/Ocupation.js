import React, { useContext, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../../App";
import SideBarMenu from "../../components/SideBarMenu";
import {
  addOcupation,
  getAllOcupations,
} from "../../services/firebase/collection/ocupation";
import { OCUPATION_PAGE } from "../../constants/routes";
import Table from "../../components/Table";
import { Column } from "primereact/column";

const Ocupation = () => {
  const { user } = useContext(AuthContext);
  const [ocupation, setOcupation] = useState({
    id: "",
    name: "",
    active: true,
  });
  const [ocupations, setOcupations] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);

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
  }, []);

  const createOcupation = async (event) => {
    try {
      const response = await addOcupation(ocupation);
      console.log("Se supone que se guardo");
    } catch (error) {
      console.log(error);
    }
    event.preventDefault();
  };

  return (
    <>
      <SideBarMenu />
      <Table
        data={ocupations}
        rows={10}
        dataKey="id"
        emptyMessage="No hay el texto"
        tableName="Ocupaciones"
        setGlobalFilter={setGlobalFilter}
      >
        <Column field="name" header="Ocupación" sortable />
        <Column field="id" header="Estado" sortable />

        <Column
          header="Acciones"
          body={(rowData) => (
            <button onClick={() => console.log(rowData)}>Aplastame we</button>
          )}
          filterPlaceholder="Search by name"
        />
      </Table>
    </>
  );
};

export default Ocupation;
