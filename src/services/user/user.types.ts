import { Clinic } from "../clinics/clinics.types";
import { Code } from "../codes/codes.types";
import { Permission, Role } from "../roles/roles.types";
import { Telecom } from "../telecoms/telecom.types";

export type Communication = {
  id: number;
  preferred: boolean;
  language: Code;
};

export type Qualification = {
  id: number;
  issuer: string;
  start_date: string;
  end_date: string | null;
  pdf: string;
  type: Code;
};

export type User = {
  id: number;
  f_name: string;
  l_name: string;
  text: string;
  family: string;
  given: string;
  prefix: string;
  suffix: string;
  avatar: string;
  address: string;
  date_of_birth: string;
  deceased_date: string | null;
  email: string;
  email_verified_at: string;
  active: boolean;
  gender: Code;
  telecoms: Telecom[];
  communications: Communication[];
  qualifications: Qualification[];
  clinic: Clinic | null;
  roles: Role[];
};

export type UserUpdateProfilePayload = {
  f_name?: string | undefined;
  l_name?: string | undefined;
  gender_id?: number | undefined;
  date_of_birth?: string | undefined;
  text?: string | undefined;
  prefix?: string | undefined;
  suffix?: string | undefined;
  avatar?: any | undefined;
  address?: string | undefined;
};

export interface UserWithPermissions extends User {
  permissions: Permission[];
}
