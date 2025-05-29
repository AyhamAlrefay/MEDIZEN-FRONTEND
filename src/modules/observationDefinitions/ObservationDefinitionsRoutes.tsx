/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { ObservationDefinitionsComponent } from "./ObservationDefinitionsComponent";
const ObservationDefinitionsIndexPage = lazy(
  () => import("./pages/ObservationDefinitionsIndex")
);
const ObservationDefinitionsShowPage = lazy(
  () => import("./pages/ObservationDefinitionsShow")
);
const ObservationDefinitionsCreatePage = lazy(
  () => import("./pages/ObservationDefinitionsCreate")
);
const ObservationDefinitionsUpdatePage = lazy(
  () => import("./pages/ObservationDefinitionsUpdate")
);
const QualifiedValuesUpdatePage = lazy(
  () => import("./pages/QualifiedValuesUpdate")
);
const QualifiedValuesCreatePage = lazy(
  () => import("./pages/QualifiedValuesCreate")
);

export const observationDefinitionsRoutes: RouteObject[] = [
  {
    path: "/observation-definitions",
    element: <ObservationDefinitionsComponent />,
    id: "observation-definitions",
    children: [
      {
        index: true,
        element: <ObservationDefinitionsIndexPage />,
        id: "observation-definitions-index",
      },
      {
        path: "show/:id",
        element: <ObservationDefinitionsShowPage />,
        id: "observation-definitions-show",
      },
      {
        path: "create",
        element: <ObservationDefinitionsCreatePage />,
        id: "observation-definitions-create",
      },
      {
        path: "update/:id",
        element: <ObservationDefinitionsUpdatePage />,
        id: "observation-definitions-update",
      },
      {
        path: ":id/qualified-values/create",
        element: <QualifiedValuesCreatePage />,
        id: "qualified-values-create",
      },
      {
        path: ":observationId/qualified-values/update/:id",
        element: <QualifiedValuesUpdatePage />,
        id: "qualified-values-update",
      },
    ],
  },
];
