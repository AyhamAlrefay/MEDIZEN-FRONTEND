/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { PractitionerComponent } from "./PractitionerComponent";

const PractitionerIndexPage = lazy(() => import("./pages/PractitionerIndex"));
const PractitionerShowPage = lazy(() => import("./pages/PractitionerShow"));
const PractitionerCreatePage = lazy(() => import("./pages/PractitionerCreate"));
export const PractitionerRoutes: RouteObject[] = [
  {
    path: "practitioners",
    element: <PractitionerComponent />,
    id: "practitioners",
    children: [
      {
        index: true,
        element: <PractitionerIndexPage />,
        id: "practitioner-index",
      },
      {
        path: "show/:id",
        element: <PractitionerShowPage />,
        id: "practitioner-show",
      },
      {
        path: "create",
        element: <PractitionerCreatePage />,
        id: "practitioner-create",
      },
    ],
  },
];
