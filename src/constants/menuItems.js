import React, { useState } from "react";
import { PrimeIcons } from "primereact/api";
import { LOGIN_PAGE, TEACHER_PAGE } from "./routes";

export const ADMINISTRATOR_ITEMS = [
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
    label: "Administrar registros",
    icon: "pi pi-home",
    items: [
      {
        label: "Registrar asistencias",
        icon: "pi pi-check",
      },
      {
        label: "Registrar pago",
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
    label: "Administrar registros",
    icon: "pi pi-home",
    items: [
      {
        label: "Registrar asistencias",
        icon: "pi pi-check",
      },
      {
        label: "Registrar pago",
        icon: "pi pi-check",
      },
    ],
  },
  {
    label: "Cerrar Sesión",
    icon: "pi pi-fw pi-power-off",
  },
];
