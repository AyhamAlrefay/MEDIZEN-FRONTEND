/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { RolesComponent } from "./RolesComponent";

const RolesIndexPage = lazy(() => import("./pages/RolesIndex"));
const RolePermissionsPage = lazy(() => import("./pages/RolePermissions"));

export const rolesRoutes: RouteObject[] = [
  {
    path: "roles",
    element: <RolesComponent />,
    id: "roles",
    children: [
      {
        index: true,
        element: <RolesIndexPage />,
        id: "roles-index",
      },
      {
        path: ":id/permissions",
        element: <RolePermissionsPage />,
        id: "role-permissions",
      },
    ],
  },
]; 