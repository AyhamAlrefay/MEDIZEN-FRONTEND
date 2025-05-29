/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { ShowMyClinicComponent } from "./ShowMyClinicComponent";

const ShowMyClinicIndexPage = lazy(() => import("./pages/ShowMyClinicIndex"));

export const showMyClinicRoutes: RouteObject[] = [
  {
    path: "/show-my-clinic",
    element: <ShowMyClinicComponent />,
    id: "show-my-clinic",
    children: [
      {
        index: true,
        element: <ShowMyClinicIndexPage />,
        id: "show-my-clinic-index",
      },
    ],
  },
];
