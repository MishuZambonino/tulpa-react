import React, { useState } from "react";
import { PrimeIcons } from "primereact/api";

export const NUMERARIA_ITEMS = [
  {
    label: "Administrar Catálogos",
    icon: "pi pi-book",
    items: [
      {
        label: "Ocupaciones",
        icon: "pi pi-check",
      },
      {
        label: "Pisos",
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
