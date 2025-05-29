import Axios from "@/services/interceptor";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { LoginAuthModelType, LoginResAuthModelType } from "./auth.types";
import { AxiosResponse } from "axios";

export const useAuthService = () => {
  const Url = "/practitioner/auth";
  return {
    login: () => {
      return {
        useMutation: (
          options?: Omit<
            UseMutationOptions<
              AxiosResponse<LoginResAuthModelType, any>,
              unknown,
              unknown,
              unknown
            >,
            "mutationFn" | "mutationKey"
          >,
        ) => {
          const mutation = useMutation({
            mutationKey: ["login-auth"],
            mutationFn: async (data: LoginAuthModelType) =>
              Axios.post(`${Url}/login`, data, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
    logout: () => {
      return {
        useMutation: (
          options?: Omit<
            UseMutationOptions<
              AxiosResponse<LoginResAuthModelType, any>,
              unknown,
              unknown,
              unknown
            >,
            "mutationFn" | "mutationKey"
          >,
        ) => {
          const mutation = useMutation({
            mutationKey: ["logout-auth"],
            mutationFn: async () =>
              Axios.post(
                `${Url}/logout`,
                {
                  all_devices: 1,
                },
                {},
              ),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
  };
};
