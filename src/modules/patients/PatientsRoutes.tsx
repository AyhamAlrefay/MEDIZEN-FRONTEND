/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { PatientsComponent } from "./PatientsComponent";
const PatientsIndexPage = lazy(() => import("./pages/PatientsIndex"));
const PatientsShowPage = lazy(() => import("./pages/PatientShow"));
const PatientsUpdatePage = lazy(() => import("./pages/PatientUpdate"));

export const PatientsRoutes: RouteObject[] = [
  {
    path: "patients",
    element: <PatientsComponent />,
    id: "patients",
    children: [
      {
        index: true,
        element: <PatientsIndexPage />,
        id: "patients-index",
      },
      {
        path: "show/:id",
        element: <PatientsShowPage />,
        id: "patients-show",
      },

      {
        path: "update/:id",
        element: <PatientsUpdatePage />,
        id: "patients-update",
      },
    ],
  },
];
