import { To, useLocation, useResolvedPath } from "react-router-dom";

export const useIsActiveRoute = ({ to }: { to: To }) => {
  const path = useResolvedPath(to);

  let toPathname = path.pathname;
  const location = useLocation();
  let locationPathname = location.pathname;
  locationPathname = locationPathname.toLowerCase();
  toPathname = toPathname.toLowerCase();
  const isActive =
    locationPathname === toPathname ||
    (locationPathname.startsWith(toPathname) &&
      locationPathname.charAt(toPathname.length) === "/");

  return { isActive, shouldNavigate: locationPathname.endsWith(toPathname) };
};
