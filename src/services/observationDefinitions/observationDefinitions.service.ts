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
  ObservationDefinitions,
  ObservationDefinitionsPayload,
} from "./observationDefinitions.types";

export const useObservationDefinitionsService = () => {
  const Url = "/practitioner/observation-definition";
  return {
    index: () => {
      const queryClient = useQueryClient();
      const queryKey = Url;
      return {
        useQuery: (
          options?: Omit<
            UseQueryOptions<
              AxiosResponse<
                BasicBackendResponse & {
                  observation_definitions: WithPaginationResponse<
                    ObservationDefinitions[]
                  >;
                }
              >
            >,
            "queryKey" | "queryFn"
          >
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                observation_definitions: WithPaginationResponse<
                  ObservationDefinitions[]
                >;
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
    indexOne: () => {
      const queryClient = useQueryClient();
      const queryKey = Url;
      return {
        useQuery: (
          id: number,
          options?: Omit<
            UseQueryOptions<
              AxiosResponse<
                BasicBackendResponse & {
                  observation_definition: ObservationDefinitions;
                }
              >
            >,
            "queryKey" | "queryFn"
          >
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                observation_definition: ObservationDefinitions;
              }
            >
          >({
            queryKey: [queryKey, id],
            queryFn: ({ signal }) => Axios.get(`${Url}/${id}`, { signal }),
            ...options,
          });
        },
        invalidate: (id: number) => {
          return queryClient.invalidateQueries({ queryKey: [queryKey, id] });
        },
        queryKey,
      };
    },
    toggleActive: () => {
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
            mutationKey: ["toggle-active", id],
            mutationFn: async () =>
              Axios.post(`${Url}/${id}/toggle-status`, {}),
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
          >
        ) => {
          const mutation = useMutation({
            mutationKey: ["observation-definition-update", id],
            mutationFn: async (data: ObservationDefinitionsPayload) =>
              Axios.post(`${Url}/${id}`, data, {}),
            ...options,
          });
          return { ...mutation };
        },
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
          >
        ) => {
          const mutation = useMutation({
            mutationKey: ["observation-definition-create"],
            mutationFn: async (data: ObservationDefinitionsPayload) =>
              Axios.post(Url, data, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
  };
};
