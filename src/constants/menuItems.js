import React, { useState } from "react";
import { PrimeIcons } from "primereact/api";
import { LOGIN_PAGE, OCUPATION_PAGE } from "./routes";

export const NUMERARIA_ITEMS = [
  {
    label: "Administrar Catálogos",
    icon: "pi pi-book",
    items: [
      {
        label: "Ocupaciones",
        icon: "pi pi-check",
        command: () => {
          onSelect(LOGIN_PAGE);
        },
      },
      {
        label: "Pisos",
        icon: "pi pi-check",
      },
      {
        label: "Universidades",
        icon: "pi pi-check",
      },
      {
        label: "Geografía",
        icon: "pi pi-check",
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
export const RESIDENT_ITEMS = [
  {
    label: "Registrar Actividad",
    icon: "pi pi-fw pi-plus",
  },
  {
    label: "Cerrar Sesión",
    icon: "pi pi-fw pi-power-off",
  },
];
