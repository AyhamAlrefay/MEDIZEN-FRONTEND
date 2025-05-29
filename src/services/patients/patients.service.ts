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
import { Patient, PatientPayload } from "./patients.types";

export const usePatientService = () => {
  const Url = "/practitioner/patients";
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
                  patients: WithPaginationResponse<Patient[]>;
                }
              >
            >,
            "queryKey" | "queryFn"
          >,
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                patients: WithPaginationResponse<Patient[]>;
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
                  Patient_profile: Patient;
                }
              >
            >,
            "queryKey" | "queryFn"
          >,
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                Patient_profile: Patient;
              }
            >
          >({
            queryKey: [queryKey, id],
            queryFn: ({ signal }) => Axios.get(`${Url}/${id}`, { signal }),
            ...options,
          });
        },
        invalidate: (id: number) =>
          queryClient.invalidateQueries({ queryKey: [queryKey, id] }),
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
              Axios.post(`${Url}/${id}/toggle-status`, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
    toggleDeceased: () => {
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
            mutationKey: ["toggle-deceased", id],
            mutationFn: async () =>
              Axios.post(`${Url}/${id}/toggle-deceased-status`, {}),
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
            mutationKey: ["patient-update", id],
            mutationFn: async (data: PatientPayload) =>
              Axios.post(`${Url}/${id}`, data, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
  };
};
