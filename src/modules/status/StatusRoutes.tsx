import Page404 from "@/modules/status/pages/Page404";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { RouteObject } from "react-router-dom";
import Page500 from "./pages/Page500";
import Page502 from "./pages/Page502";

export const statusRoutes: RouteObject[] = [
  {
    path: "*",
    id: "404",
    element: (
      <ThemeProvider>
        <Page404 />
      </ThemeProvider>
    ),
  },
  {
    path: "status/500",
    id: "500",
    element: (
      <ThemeProvider>
        <Page500 />
      </ThemeProvider>
    ),
  },
  {
    path: "status/502",
    id: "502",
    element: (
      <ThemeProvider>
          <Page502 />
      </ThemeProvider>
    ),
  },
];
