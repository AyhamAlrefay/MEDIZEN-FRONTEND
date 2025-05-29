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
import { HealthCare, HealthCarePayload } from "./healthCare.types";

export const useHealthCareService = () => {
  const Url = "/practitioner/healthcare-services";
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
                  healthCareServices: WithPaginationResponse<HealthCare[]>;
                }
              >
            >,
            "queryKey" | "queryFn"
          >
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                healthCareServices: WithPaginationResponse<HealthCare[]>;
              }
            >
          >({
            queryKey: [queryKey],
            queryFn: ({ signal }) =>
              Axios.get("/healthcare-services", { signal }),
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
                  healthCareService: HealthCare;
                }
              >
            >,
            "queryKey" | "queryFn"
          >
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                healthCareService: HealthCare;
              }
            >
          >({
            queryKey: [queryKey, id],
            queryFn: ({ signal }) =>
              Axios.get(`/healthcare-services/${id}`, { signal }),
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
              Axios.post(`${Url}/${id}/toggle-active`, {}),
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
            mutationKey: ["health-care-update", id],
            mutationFn: async (data: HealthCarePayload) =>
              Axios.post(`${Url}/${id}/update`, data, {}),
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
            mutationKey: ["health-care-create"],
            mutationFn: async (data: HealthCarePayload) =>
              Axios.post(Url, data, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
  };
};
