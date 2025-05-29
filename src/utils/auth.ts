import { ACCESS_TOKEN_STORAGE_KEY, PagesRoutes } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const authUtility = {
  storeTokens(token: string) {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  },
  destroyTokens() {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  },
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  },
  hasAccessToken() {
    const hasToken = !!authUtility.getAccessToken();
    return hasToken;
  },
};

export const useAuth = () => {
  const q = useQueryClient();
  const navigate = useNavigate();

  return {
    doLogout() {
      authUtility.destroyTokens();
      navigate(PagesRoutes.auth.login.path);
      q.resetQueries();
    },
  };
};
