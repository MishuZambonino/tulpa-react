import React, { Component, useContext, useState } from "react";
import { PanelMenu } from "primereact/panelmenu";
import { useLocation, withRouter } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import {
  OCUPATION_PAGE,
  LOGIN_PAGE,
  FLOOR_PAGE,
  UNIVERSITY_PAGE,
  COUNTRY_PAGE,
} from "../../constants/routes";
import "./style.scss";

const SideBarMenu = ({ history }) => {
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);
  const onSelect = (selected) => {
    history.push(selected);
  };
  const NUMERARIA_ITEMS = [
    {
      label: "Administrar Catálogos",
      icon: "pi pi-book",
      items: [
        {
          label: "Ocupaciones",
          icon: "pi pi-check",
          command: () => {
            onSelect(OCUPATION_PAGE);
          },
        },
        {
          label: "Pisos",
          icon: "pi pi-check",
          command: () => {
            onSelect(FLOOR_PAGE);
          },
        },
        {
          label: "Universidades",
          icon: "pi pi-check",
          command: () => {
            onSelect(UNIVERSITY_PAGE);
          },
        },
        {
          label: "Geografía",
          icon: "pi pi-check",
          command: () => {
            onSelect(COUNTRY_PAGE);
          },
        },
      ],
    },
    {
      label: "Administrar Residencia",
      icon: "pi pi-home",
      items: [
        {
          label: "Entrevistas",
          icon: "pi pi-check",
        },
        {
          label: "Residentes",
          icon: "pi pi-check",
        },
      ],
    },
    {
      label: "Cerrar Sesión",
      icon: "pi pi-fw pi-power-off",
    },
  ];
  return (
    <div>
      <div className="card">
        <Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}>
          <h3>Menú</h3>
          <PanelMenu model={NUMERARIA_ITEMS} className="menu-div" />
        </Sidebar>
        <Button
          icon="pi pi-bars"
          onClick={() => setVisibleLeft(true)}
          className="p-mr-2"
        />
      </div>
    </div>
  );
};
export default withRouter(SideBarMenu);
