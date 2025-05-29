import { Actions } from "@/can/permissions";
import { HttpCodes } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export type QueryType<TData = unknown> = {
  data: TData | Record<string, unknown>;
};

export type ParameterType<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

export type QueryServiceOptions<T = any> = ParameterType<
  typeof useQuery<T>
>["1"];

export type BasicBackendResponse = {
  status: boolean;
  errNum: HttpCodes;
  msg: string;
};

export type PaginationType = {
  current_page: number;
  per_page: number;
  total: number;
};

export type WithPaginationResponse<T> = {
  meta: PaginationType;
  data: T;
};

export type NavItem = {
  link: string;
  label: string;
  icon: React.ReactNode;
  action?: Actions;
};
