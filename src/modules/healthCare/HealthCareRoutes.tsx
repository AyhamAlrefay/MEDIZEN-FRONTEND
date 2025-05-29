/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { HealthCareComponent } from "./HealthCareComponent";
const HealthCareIndexPage = lazy(() => import("./pages/HealthCareIndex"));
const HealthCareCreatePage = lazy(() => import("./pages/HealthCareCreate"));
const HealthCareUpdatePage = lazy(() => import("./pages/HealthCareUpdate"));
const HealthCareShowPage = lazy(() => import("./pages/HealthCareShow"));

export const healthCareRoutes: RouteObject[] = [
  {
    path: "health-care",
    element: <HealthCareComponent />,
    id: "health-care",
    children: [
      {
        index: true,
        element: <HealthCareIndexPage />,
        id: "health-care-index",
      },
      {
        path: "/health-care/create",
        element: <HealthCareCreatePage />,
        id: "health-care-create",
      },
      {
        path: "/health-care/update/:id",
        element: <HealthCareUpdatePage />,
        id: "health-care-update",
      },
      {
        path: "/health-care/show/:id",
        element: <HealthCareShowPage />,
        id: "health-care-show",
      },
    ],
  },
];
