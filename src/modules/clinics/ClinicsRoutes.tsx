/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { ClinicsComponent } from "./ClinicsComponent";
const ClinicsIndexPage = lazy(() => import("./pages/ClinicsIndex"));

export const clinicsRoutes: RouteObject[] = [
  {
    path: "clinics",
    element: <ClinicsComponent />,
    id: "clinics",
    children: [
      {
        index: true,
        element: <ClinicsIndexPage />,
        id: "clinics-index",
      },
    ],
  },
];
