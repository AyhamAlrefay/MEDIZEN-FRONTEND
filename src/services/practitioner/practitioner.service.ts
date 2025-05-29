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
import { Practitioner, PractitionerPayload } from "./practitioner.types";

export const usePractitionerService = () => {
  const Url = "/practitioner";
  return {
    index: () => {
      const queryClient = useQueryClient();
      const queryKey = Url + "-all";
      return {
        useQuery: (
          options?: Omit<
            UseQueryOptions<
              AxiosResponse<
                BasicBackendResponse & {
                  practitioners: WithPaginationResponse<Practitioner[]>;
                }
              >
            >,
            "queryKey" | "queryFn"
          >,
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                practitioners: WithPaginationResponse<Practitioner[]>;
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
                  practitioner: Practitioner;
                }
              >
            >,
            "queryKey" | "queryFn"
          >,
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                practitioner: Practitioner;
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
          >,
        ) => {
          const mutation = useMutation({
            mutationKey: ["practitioner-create"],
            mutationFn: async (data: PractitionerPayload) =>
              Axios.post(`${Url}/auth/register`, data, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
    verifyOtp: () => {
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
            mutationKey: ["practitioner-verify-otp"],
            mutationFn: async (data: { email: string; otp: string }) =>
              Axios.post(`${Url}/auth/verify-otp`, data, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
    resendOtp: () => {
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
            mutationKey: ["practitioner-resend-otp"],
            mutationFn: async (data: { email: string }) =>
              Axios.post(`${Url}/auth/resend-otp`, data, {}),
            ...options,
          });
          return { ...mutation };
        },
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
    updateRole: () => {
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
            mutationKey: ["update-practitioner-role", id],
            mutationFn: async (role_id: number) =>
              Axios.post(`${Url}/${id}/role`, { role_id }, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
  };
};
