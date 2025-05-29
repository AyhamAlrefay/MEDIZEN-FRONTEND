/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { AppointmentsComponent } from "./AppointmentsComponent";

const AppointmentsIndexPage = lazy(() => import("./pages/AppointmentsIndex"));
const AppointmentsShowPage = lazy(() => import("./pages/AppointmentsShow"));
const AppointmentsCreatePage = lazy(() => import("./pages/AppointmentsCreate"));

export const appointmentsRoutes: RouteObject[] = [
  {
    path: "/appointments",
    element: <AppointmentsComponent />,
    id: "appointments",
    children: [
      {
        index: true,
        element: <AppointmentsIndexPage />,
        id: "appointments-index",
      },
      {
        path: "show/:id",
        element: <AppointmentsShowPage />,
        id: "appointments-show",
      },
      {
        path: "create",
        element: <AppointmentsCreatePage />,
        id: "appointments-create",
      },
    ],
  },
];
