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
import { AppointmentPayload, Appointments } from "./appointments.types";

export const useAppointmentsService = () => {
  const Url = "/practitioner/appointments";
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
                  appointments: WithPaginationResponse<Appointments[]>;
                }
              >
            >,
            "queryKey" | "queryFn"
          >
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                appointments: WithPaginationResponse<Appointments[]>;
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
                  appointment: Appointments;
                }
              >
            >,
            "queryKey" | "queryFn"
          >
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                appointment: Appointments;
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
            mutationKey: ["appointment-create"],
            mutationFn: async (data: AppointmentPayload) =>
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
          >
        ) => {
          const mutation = useMutation({
            mutationKey: ["clinic-update", id],
            mutationFn: async (data: AppointmentPayload) =>
              Axios.post(`${Url}/${id}/update`, data, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
    cancelToggle: () => {
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
            mutationKey: ["cancel-toggle", id],
            mutationFn: async () => Axios.post(`${Url}/${id}/cancel`, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
    FinishToggle: () => {
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
            mutationKey: ["finish-toggle", id],
            mutationFn: async () => Axios.post(`${Url}/${id}/finish`, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
  };
};
