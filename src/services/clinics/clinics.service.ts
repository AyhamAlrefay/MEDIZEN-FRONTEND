import { Practitioner } from "@/services/practitioner/practitioner.types";
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
import { Clinic, ClinicPayload } from "./clinics.types";

export const useClinicsService = () => {
  const Url = "/practitioner/clinics";
  return {
    index: () => {
      const queryClient = useQueryClient();
      const queryKey = "clinics";

      return {
        useQuery: (
          options?: Omit<
            UseQueryOptions<
              AxiosResponse<
                BasicBackendResponse & {
                  clinics: WithPaginationResponse<Clinic[]>;
                }
              >
            >,
            "queryKey" | "queryFn"
          >,
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                clinics: WithPaginationResponse<Clinic[]>;
              }
            >
          >({
            queryKey: [queryKey],
            queryFn: ({ signal }) => Axios.get("/clinics", { signal }),
            ...options,
          });
        },
        invalidate: () =>
          queryClient.invalidateQueries({ queryKey: [queryKey] }),
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
          >,
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
            mutationKey: ["clinic-create"],
            mutationFn: async (data: ClinicPayload) =>
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
            mutationKey: ["clinic-update", id],
            mutationFn: async (data: ClinicPayload) =>
              Axios.post(`${Url}/${id}/update`, data, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
  };
};

export const useClinicsReceptionistService = () => {
  const Url = "/patient/clinics";
  return {
    index: () => {
      const queryClient = useQueryClient();
      const queryKey = "clinics-doctors";
      return {
        useQuery: (
          id: number,
          options?: Omit<
            UseQueryOptions<
              AxiosResponse<
                BasicBackendResponse & {
                  doctors: WithPaginationResponse<Practitioner[]>;
                }
              >
            >,
            "queryKey" | "queryFn"
          >,
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                doctors: WithPaginationResponse<Practitioner[]>;
              }
            >
          >({
            queryKey: [queryKey, id],
            queryFn: ({ signal }) =>
              Axios.get(`${Url}/${id}/doctors`, { signal }),
            ...options,
          });
        },
        invalidate: () =>
          queryClient.invalidateQueries({ queryKey: [queryKey] }),
        queryKey,
      };
    },
  };
};
