/* eslint-disable react-refresh/only-export-components */
import ShouldNotBeLogged from "@/middlewares/ShouldNotBeLogged";
import { AuthComponent } from "@/modules/auth/AuthComponent";
import { SplashPage } from "@/pages/SplashPage";
import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

const LoginInPage = lazy(() => import("./pages/SignIn"));
export const authRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: (
      <ShouldNotBeLogged>
        <Suspense fallback={<SplashPage />}>
          <AuthComponent />
        </Suspense>
      </ShouldNotBeLogged>
    ),
    id: "auth",
    children: [
      {
        path: "login",
        element: <LoginInPage />,
        id: "login",
      },
    ],
  },
];
