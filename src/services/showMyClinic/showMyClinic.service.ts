import {
  useQuery,
  UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Axios from "../interceptor";
import { BasicBackendResponse, WithPaginationResponse } from "@/types";
import { showMyClinic } from "./showMyClinic.types";

export const useShowMyClinicService = () => {
  const Url = "/practitioner/show-my-clinic";
  return {
    index: () => {
      const queryClient = useQueryClient();
      const queryKey = "show-clinic";

      return {
        useQuery: (
          options?: Omit<
            UseQueryOptions<
              AxiosResponse<
                BasicBackendResponse & {
                  clinic: showMyClinic;
                }
              >
            >,
            "queryKey" | "queryFn"
          >,
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                clinic: showMyClinic;
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
  };
};
