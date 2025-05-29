import { PageLoader } from "@/shared/components/PageLoader";
import { ThemeProvider } from "@/theme/ThemeProvider";
import React from "react";
import { Outlet } from "react-router-dom";

export function AuthComponent() {
  return (
    <ThemeProvider>
      <React.Suspense fallback={<PageLoader />}>
        <Outlet />
      </React.Suspense>
    </ThemeProvider>
  );
}
