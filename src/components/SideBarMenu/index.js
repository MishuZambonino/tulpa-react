import React, { Component, useContext, useState } from "react";
import { PanelMenu } from "primereact/panelmenu";
import { useLocation, withRouter } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import {
  TEACHER_PAGE,
  LOGIN_PAGE,
  SCHEDULE_PAGE,
  BALANCE_PAGE,
  STUDENT_PAGE,
} from "../../constants/routes";
import "./style.scss";

const SideBarMenu = ({ history }) => {
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);
  const onSelect = (selected) => {
    history.push(selected);
  };
  const ADMINISTRATOR_ITEMS = [
    {
      label: "Administrar Centro",
      icon: "pi pi-home",
      items: [
        {
          label: "Profesores",
          icon: "pi pi-user",
          command: () => {
            onSelect(TEACHER_PAGE);
          },
        },
        {
          label: "Horarios",
          icon: "pi pi-calendar",
          command: () => {
            onSelect(SCHEDULE_PAGE);
          },
        },
        {
          label: "Balances",
          icon: "pi pi-dollar",
          command: () => {
            onSelect(BALANCE_PAGE);
          },
        },
        {
          label: "Estudiantes",
          icon: "pi pi-user",
          command: () => {
            onSelect(STUDENT_PAGE);
          },
        },
      ],
    },
    {
      label: "Administrar Registros",
      icon: "pi pi-tags",
      items: [
        {
          label: "Registrar asistencias",
          icon: "pi pi-check",
        },
        {
          label: "Registrar pagos",
          icon: "pi pi-dollar",
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
          <PanelMenu model={ADMINISTRATOR_ITEMS} className="menu-div" />
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
