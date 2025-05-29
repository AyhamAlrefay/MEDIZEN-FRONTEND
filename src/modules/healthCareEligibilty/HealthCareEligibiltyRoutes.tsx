/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { HealthCareEligibiltyComponent } from "./HealthCareEligibiltyComponent";
const HealthCareEligibiltyIndexPage = lazy(
  () => import("./pages/HealthCareEligibiltyIndex"),
);
// const HealthCareCreatePage = lazy(() => import("./pages/HealthCareCreate"));
// const HealthCareUpdatePage = lazy(() => import("./pages/HealthCareUpdate"));

export const healthCareEligibiltyRoutes: RouteObject[] = [
  {
    path: "health-care-eligibilty",
    element: <HealthCareEligibiltyComponent />,
    id: "health-care-eligibilty",
    children: [
      {
        index: true,
        element: <HealthCareEligibiltyIndexPage />,
        id: "health-care-eligibilty-index",
      },
    ],
  },
];
