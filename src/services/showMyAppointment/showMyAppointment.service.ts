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
import { finishAppointmentsPayload } from "./showMyAppointment.types";
import { Appointments } from "../appointments/appointments.types";

export const useShowMyAppointmentService = () => {
  const Url = "/practitioner/my-appointments-doctor";
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
    finichAppointment: () => {
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
            mutationKey: ["finish-appointment", id],
            mutationFn: async (data: finishAppointmentsPayload) =>
              Axios.post(`/practitioner/appointments/${id}/finish`, data, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
  };
};
