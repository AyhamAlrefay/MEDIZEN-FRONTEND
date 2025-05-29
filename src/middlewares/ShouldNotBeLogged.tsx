import { PagesRoutes } from "@/constants/pages-routes";
import { authUtility } from "@/utils/auth";
import { Navigate } from "react-router-dom";

const ShouldNotBeLogged = ({ children }: { children: JSX.Element }) => {
  if (authUtility.hasAccessToken()) {
    return <Navigate to={PagesRoutes.home.path} />;
  }

  return children;
};

export default ShouldNotBeLogged;
