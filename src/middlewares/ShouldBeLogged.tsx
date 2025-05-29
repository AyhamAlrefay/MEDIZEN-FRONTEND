import { PagesRoutes } from "@/constants/pages-routes";
import { authUtility } from "@/utils/auth";
import { Navigate, useLocation } from "react-router-dom";

const ShouldBeLogged = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  if (!authUtility.hasAccessToken()) {    
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={PagesRoutes.auth.login.path} state={location.pathname} replace />;
  }

  return children;
};

export default ShouldBeLogged;
