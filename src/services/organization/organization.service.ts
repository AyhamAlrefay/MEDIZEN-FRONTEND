import {
  useQuery,
  UseQueryOptions,
  useQueryClient,
  UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Axios from "../interceptor";
import { BasicBackendResponse } from "@/types";
import { Organization, OrganizationPayload } from "./organization.types";

export const useOrganizationService = () => {
  const Url = "/practitioner/organization";
  return {
    show: () => {
      const queryClient = useQueryClient();
      const queryKey = Url;

      return {
        useQuery: (
          options?: Omit<
            UseQueryOptions<
              AxiosResponse<
                BasicBackendResponse & {
                  organization: Organization;
                }
              >
            >,
            "queryKey" | "queryFn"
          >,
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                organization: Organization;
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
    update: () => {
      return {
        useMutation: (
          options?: Omit<
            UseMutationOptions<
              AxiosResponse<BasicBackendResponse>,
              Error,
              OrganizationPayload
            >,
            "mutationFn"
          >,
        ) => {
          return useMutation({
            mutationFn: async (data: OrganizationPayload) =>
              Axios.put(Url, data),
            ...options,
          });
        },
      };
    },
  };
};
