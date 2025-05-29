/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { ShowMyAppointmentComponent } from "./ShowMyAppointmentsComponent";

const ShowMyAppointmentsIndexPage = lazy(
  () => import("./pages/ShowMyAppointmentsIndex")
);

export const showMyAppointmentsRoutes: RouteObject[] = [
  {
    path: "/show-my-appointments",
    element: <ShowMyAppointmentComponent />,
    id: "show-my-appointments",
    children: [
      {
        index: true,
        element: <ShowMyAppointmentsIndexPage />,
        id: "show-my-appointments-index",
      },
    ],
  },
];
