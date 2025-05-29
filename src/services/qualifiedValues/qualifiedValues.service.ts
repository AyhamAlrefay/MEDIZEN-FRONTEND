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
import {
  QualifiedValues,
  QualifiedValuesPayload,
} from "./qualifiedValues.types";

export const useQualifiedValuesService = () => {
  const Url = "/practitioner/observation-definition";
  return {
    index: () => {
      const queryClient = useQueryClient();
      const queryKey = Url + "qualified-values";
      return {
        useQuery: (
          id?: number,
          options?: Omit<
            UseQueryOptions<
              AxiosResponse<
                BasicBackendResponse & {
                  qualified_values: WithPaginationResponse<QualifiedValues[]>;
                }
              >
            >,
            "queryKey" | "queryFn"
          >
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                qualified_values: WithPaginationResponse<QualifiedValues[]>;
              }
            >
          >({
            queryKey: [queryKey, id],
            queryFn: ({ signal }) =>
              Axios.get(`${Url}/${id}/qualified-values`, { signal }),
            ...options,
          });
        },
        invalidate: () =>
          queryClient.invalidateQueries({ queryKey: [queryKey] }),
        queryKey,
      };
    },
    indexOne: () => {
      const queryKey = Url + "qualified-values";
      return {
        useQuery: (
          id?: number,
          options?: Omit<
            UseQueryOptions<
              AxiosResponse<
                BasicBackendResponse & {
                  qualified_value: QualifiedValues;
                }
              >
            >,
            "queryKey" | "queryFn"
          >
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                qualified_value: QualifiedValues;
              }
            >
          >({
            queryKey: [queryKey + "show", id],
            queryFn: ({ signal }) =>
              Axios.get(`${Url}/qualified-values/${id}`, { signal }),
            ...options,
          });
        },
      };
    },
    update: () => {
      return {
        useMutation: (
          id?: number,
          options?: Omit<
            UseMutationOptions<
              AxiosResponse<BasicBackendResponse & {}, any>,
              unknown,
              unknown,
              unknown
            >,
            "mutationFn" | "mutationKey"
          >
        ) => {
          const mutation = useMutation({
            mutationKey: ["qualified-values-update", id],
            mutationFn: async (data: QualifiedValuesPayload) =>
              Axios.post(`${Url}/qualified-values/${id}`, data, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
    create: () => {
      return {
        useMutation: (
          id?: number,
          options?: Omit<
            UseMutationOptions<
              AxiosResponse<BasicBackendResponse & {}, any>,
              unknown,
              unknown,
              unknown
            >,
            "mutationFn" | "mutationKey"
          >
        ) => {
          const mutation = useMutation({
            mutationKey: ["qualified-values-create"],
            mutationFn: async (data: QualifiedValuesPayload) =>
              Axios.post(`${Url}/${id}/qualified-values`, data, {}),
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
          >
        ) => {
          const mutation = useMutation({
            mutationKey: ["qualified-values-delete", id],
            mutationFn: async () =>
              Axios.delete(`${Url}/qualified-values/${id}`, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
  };
};
