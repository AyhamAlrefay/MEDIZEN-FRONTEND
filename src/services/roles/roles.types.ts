import { Code } from "../codes/codes.types";
export enum GUARD_NAME_OPTIONS {
  PRACTITIONER = "practitioner",
  PATIENT = "patient",
}
export type Permission = {
  id: number;
  name: string;
  guard_name: GUARD_NAME_OPTIONS;
};

export type GroupWithPermissions = {
  id: number;
  display: string;
  permissions: Permission[];
};

export type Role = {
  id: number;
  name: string;
  guard_name: GUARD_NAME_OPTIONS;
  permissions: Permission[];
};

export type RolePayload = {
  name: string;
};
