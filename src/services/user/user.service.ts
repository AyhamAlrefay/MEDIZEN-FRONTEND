import {
  useQuery,
  UseQueryOptions,
  useQueryClient,
  UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Axios from "../interceptor";
import { User, UserUpdateProfilePayload } from "./user.types";
import { BasicBackendResponse } from "@/types";

export const useUserService = () => {
  const Url = "/practitioner";
  return {
    showMe: () => {
      const queryClient = useQueryClient();
      const queryKey = Url + "-show-me";

      return {
        useQuery: (
          options?: Omit<
            UseQueryOptions<
              AxiosResponse<BasicBackendResponse & { profile: User }>
            >,
            "queryKey" | "queryFn"
          >,
        ) => {
          return useQuery<
            AxiosResponse<BasicBackendResponse & { profile: User }>
          >({
            queryKey: [queryKey],
            queryFn: ({ signal }) => Axios.get(`${Url}/me`, { signal }),
            ...options,
          });
        },
        invalidate: () =>
          queryClient.invalidateQueries({ queryKey: [queryKey] }),
        queryKey,
      };
    },
    updateMe: () => {
      return {
        useMutation: (
          options?: Omit<
            UseMutationOptions<
              AxiosResponse<BasicBackendResponse, any>,
              unknown,
              unknown,
              unknown
            >,
            "mutationFn" | "mutationKey"
          >,
        ) => {
          const mutation = useMutation({
            mutationKey: ["profile-update"],
            mutationFn: async (data: UserUpdateProfilePayload) =>
              Axios.post(`${Url}/profile/update`, data, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
  };
};
