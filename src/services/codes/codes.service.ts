import {
  useQuery,
  UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Axios from "../interceptor";
import { BasicBackendResponse } from "@/types";
import { Code } from "./codes.types";

export const useCodesService = () => {
  const Url = "/codes";
  return {
    index: () => {
      const queryClient = useQueryClient();
      const queryKey = Url + "-show-me";

      return {
        useQuery: (
          filters: {
            code_type_id: number;
          },
          options?: Omit<
            UseQueryOptions<
              AxiosResponse<BasicBackendResponse & { codes: { data: Code[] } }>
            >,
            "queryKey" | "queryFn"
          >,
        ) => {
          return useQuery<
            AxiosResponse<BasicBackendResponse & { codes: { data: Code[] } }>
          >({
            queryKey: [queryKey + filters.code_type_id],
            queryFn: ({ signal }) =>
              Axios.get(`${Url}`, { signal, params: filters }),
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
