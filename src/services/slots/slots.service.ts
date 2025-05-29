import {
  useQuery,
  UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Axios from "../interceptor";
import { BasicBackendResponse } from "@/types";
import { Slot } from "./slots.types";

export const useSlotsService = () => {
  const Url = "practitioner/slots";
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
                  slots: Slot[];
                }
              >
            >,
            "queryKey" | "queryFn"
          >
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                slots: Slot[];
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
    generate: () => {
      const queryClient = useQueryClient();
      const queryKey = Url;
      return {
        useQuery: (
          filters: {
            practitioner_id?: number;
            date?: string;
          },
          options?: Omit<
            UseQueryOptions<
              AxiosResponse<
                BasicBackendResponse & {
                  slots: Slot[];
                }
              >
            >,
            "queryKey" | "queryFn"
          >
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                slots: Slot[];
              }
            >
          >({
            queryKey: [queryKey + filters.date + filters.practitioner_id],
            queryFn: ({ signal }) =>
              Axios.get(`${Url}/generate`, { signal, params: filters }),
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
