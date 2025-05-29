import { Code } from "../codes/codes.types";
import { Role } from "../roles/roles.types";
import { Telecom } from "../telecoms/telecom.types";

type communicationsType = {
  id: number;
  preferred: boolean;
  language: Code;
};

type clinicType = {
  id: number;
  name: string;
  photo: string | null;
  description: string;
};

type Qualification = {
  id: number;
  issuer: string;
  start_date: string;
  end_date: string | null;
  pdf: string;
  type: Code;
};

export type Practitioner = {
  id: number;
  f_name?: string;
  l_name?: string;
  text?: string;
  family?: string;
  given?: string;
  prefix?: string;
  suffix?: string;
  avatar?: string;
  address?: string;
  email?: string;
  email_verified_at?: string;
  date_of_birth?: string;
  deceased_date?: string | null;
  active?: number;
  gender?: Code;
  telecoms?: Telecom[];
  communications?: communicationsType[];
  clinic?: clinicType;
  qualifications?: Qualification[];
  roles?: Role[];
};

export type PractitionerPayload = {
  f_name?: string | undefined;
  l_name?: string | undefined;
  email?: string | undefined;
  password?: number | undefined;
  date_of_birth?: number | undefined;
  clinic_id?: number | undefined;
  gender_id?: number | undefined;
  role_id?: number | undefined;
};
