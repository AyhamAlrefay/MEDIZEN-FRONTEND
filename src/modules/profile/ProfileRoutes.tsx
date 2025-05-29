/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { ProfileComponent } from "./ProfileComponent";

const ProfileShowPage = lazy(() => import("./pages/ProfileShow"));
const ProfileUpdatePage = lazy(() => import("./pages/ProfileUpdate"));
const TelecomsIndexPage = lazy(() => import("./pages/TelecomIndex"));
export const profileRoutes: RouteObject[] = [
  {
    path: "profile",
    element: <ProfileComponent />,
    id: "profile",
    children: [
      {
        path: "info",
        element: <ProfileShowPage />,
        id: "personal-info",
      },
      {
        path: "info/update",
        element: <ProfileUpdatePage />,
        id: "profile-update",
      },
      {
        path: "telecoms",
        element: <TelecomsIndexPage />,
        id: "telecoms",
      },
    ],
  },
];
