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
  HealthCareEligibilty,
  HealthCareEligibiltyPayload,
} from "./healthCareEligibilty.types";

export const useHealthCareEligibiltyService = () => {
  const Url = "/practitioner/health-care-service-eligibility-codes";
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
                  healthCareServiceEligibilityCodes: WithPaginationResponse<
                    HealthCareEligibilty[]
                  >;
                }
              >
            >,
            "queryKey" | "queryFn"
          >,
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                healthCareServiceEligibilityCodes: WithPaginationResponse<
                  HealthCareEligibilty[]
                >;
              }
            >
          >({
            queryKey: [queryKey],
            queryFn: ({ signal }) =>
              Axios.get("/health-care-service-eligibility-codes", { signal }),
            ...options,
          });
        },
        invalidate: () =>
          queryClient.invalidateQueries({ queryKey: [queryKey] }),
        queryKey,
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
            mutationKey: ["health-care-eligibilty-update", id],
            mutationFn: async (data: HealthCareEligibiltyPayload) =>
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
              AxiosResponse<
                BasicBackendResponse & {
                  healthCareServiceEligibilityCode: HealthCareEligibilty;
                },
                any
              >,
              unknown,
              unknown,
              unknown
            >,
            "mutationFn" | "mutationKey"
          >,
        ) => {
          const mutation = useMutation({
            mutationKey: ["health-care-eligibilty-create"],
            mutationFn: async (data: HealthCareEligibiltyPayload) =>
              Axios.post(Url, data, {}),
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
            mutationKey: ["delete-health-care-eligibilty", id],
            mutationFn: async () => Axios.delete(`${Url}/${id}`, {}),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
  };
};
