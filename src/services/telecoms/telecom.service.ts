import {
  useQuery,
  UseQueryOptions,
  useQueryClient,
  UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Axios from "../interceptor";
import { BasicBackendResponse, WithPaginationResponse } from "@/types";
import { Telecom, TelecomPayload } from "./telecom.types";

export const useTelecomService = () => {
  const Url = "/practitioner/telecoms";
  return {
    index: () => {
      const queryClient = useQueryClient();
      const queryKey = Url + "telecoms";

      return {
        useQuery: (
          options?: Omit<
            UseQueryOptions<
              AxiosResponse<
                BasicBackendResponse & {
                  telecoms: WithPaginationResponse<Telecom[]>;
                }
              >
            >,
            "queryKey" | "queryFn"
          >,
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                telecoms: WithPaginationResponse<Telecom[]>;
              }
            >
          >({
            queryKey: [queryKey],
            queryFn: ({ signal }) => Axios.get(Url, { signal }),
            ...options,
          });
        },
        invalidate: () =>
          queryClient.invalidateQueries({ queryKey: [queryKey] }),
        queryKey,
      };
    },
    create: () => {
      return {
        useMutation: (
          options?: Omit<
            UseMutationOptions<
              AxiosResponse<BasicBackendResponse & {}, any>,
              unknown,
              unknown,
              unknown
            >,
            "mutationFn" | "mutationKey"
          >,
        ) => {
          const mutation = useMutation({
            mutationKey: ["telecom-create"],
            mutationFn: async (data: TelecomPayload) =>
              Axios.post(Url, data, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
    update: () => {
      return {
        useMutation: (
          id: number,
          options?: Omit<
            UseMutationOptions<
              AxiosResponse<BasicBackendResponse & {}, any>,
              unknown,
              unknown,
              unknown
            >,
            "mutationFn" | "mutationKey"
          >,
        ) => {
          const mutation = useMutation({
            mutationKey: ["telecom-update", id],
            mutationFn: async (data: TelecomPayload) =>
              Axios.post(`${Url}/${id}`, data, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
    delete: () => {
      return {
        useMutation: (
          id: number,
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
            mutationKey: ["delete-telecom", id],
            mutationFn: async () => Axios.delete(`${Url}/${id}`, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
  };
};
