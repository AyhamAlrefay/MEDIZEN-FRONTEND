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
  Role,
  RolePayload,
  Permission,
  GroupWithPermissions,
} from "./roles.types";

export const useRolesService = () => {
  const Url = "/practitioner";
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
                  roles: WithPaginationResponse<Role[]>;
                }
              >
            >,
            "queryKey" | "queryFn"
          >,
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                roles: WithPaginationResponse<Role[]>;
              }
            >
          >({
            queryKey: [queryKey],
            queryFn: ({ signal }) => Axios.get(`${Url}/roles`, { signal }),
            ...options,
          });
        },
        invalidate: () =>
          queryClient.invalidateQueries({ queryKey: [queryKey] }),
        queryKey,
      };
    },
    create: () => {
      return {
        useMutation: (
          options?: Omit<
            UseMutationOptions<
              AxiosResponse<BasicBackendResponse, any>,
              unknown,
              RolePayload,
              unknown
            >,
            "mutationFn" | "mutationKey"
          >,
        ) => {
          const mutation = useMutation({
            mutationKey: ["role-create"],
            mutationFn: async (data: RolePayload) =>
              Axios.post(`${Url}/roles`, data),
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
              AxiosResponse<BasicBackendResponse, any>,
              unknown,
              RolePayload,
              unknown
            >,
            "mutationFn" | "mutationKey"
          >,
        ) => {
          const mutation = useMutation({
            mutationKey: ["role-update", id],
            mutationFn: async (data: RolePayload) =>
              Axios.post(`${Url}/roles/${id}`, data),
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
            mutationKey: ["role-delete", id],
            mutationFn: async () => Axios.delete(`${Url}/roles/${id}`),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
    getRolePermissions: () => {
      const queryClient = useQueryClient();
      const queryKey = `${Url}-permissions`;
      return {
        useQuery: (
          roleId: number,
          options?: Omit<
            UseQueryOptions<
              AxiosResponse<
                BasicBackendResponse & {
                  role: Role;
                }
              >
            >,
            "queryKey" | "queryFn"
          >,
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                role: Role;
              }
            >
          >({
            queryKey: [queryKey, roleId],
            queryFn: ({ signal }) =>
              Axios.get(`${Url}/roles/${roleId}/permissions`, { signal }),
            ...options,
          });
        },
        invalidate: () =>
          queryClient.invalidateQueries({ queryKey: [queryKey] }),
        queryKey,
      };
    },
    getAllPermissions: () => {
      const queryClient = useQueryClient();
      const queryKey = `${Url}-all-permissions`;
      return {
        useQuery: (
          options?: Omit<
            UseQueryOptions<
              AxiosResponse<
                BasicBackendResponse & {
                  groups_with_permissions: GroupWithPermissions[];
                }
              >
            >,
            "queryKey" | "queryFn"
          >,
        ) => {
          return useQuery<
            AxiosResponse<
              BasicBackendResponse & {
                groups_with_permissions: GroupWithPermissions[];
              }
            >
          >({
            queryKey: [queryKey],
            queryFn: ({ signal }) => Axios.get(`${Url}/groups`, { signal }),
            ...options,
          });
        },
        invalidate: () =>
          queryClient.invalidateQueries({ queryKey: [queryKey] }),
        queryKey,
      };
    },
    assignPermissions: () => {
      return {
        useMutation: (
          roleId: number,
          options?: Omit<
            UseMutationOptions<
              AxiosResponse<BasicBackendResponse & { role: Role }, any>,
              unknown,
              number[],
              unknown
            >,
            "mutationFn" | "mutationKey"
          >,
        ) => {
          const mutation = useMutation({
            mutationKey: ["role-assign-permissions", roleId],
            mutationFn: async (permissionIds: number[]) =>
              Axios.post(`${Url}/roles/${roleId}/assign-permissions`, {
                permissions: permissionIds,
              }),
            ...options,
          });
          return { ...mutation };
        },
      };
    },
  };
};
