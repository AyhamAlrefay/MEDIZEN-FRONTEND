/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { OrganizationComponent } from "./OrganizationComponent";

const OrganizationShowPage = lazy(() => import("./pages/OrganizationShow"));
export const organizationRoutes: RouteObject[] = [
  {
    path: "organization",
    element: <OrganizationComponent />,
    id: "organization",
    children: [
      {
        index:true,
        element: <OrganizationShowPage />,
        id: "organization-info",
      },
    
    ],
  },
];
