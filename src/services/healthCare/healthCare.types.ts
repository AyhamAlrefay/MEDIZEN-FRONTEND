import { Clinic } from "../clinics/clinics.types";
import { Code } from "../codes/codes.types";

export type HealthCare = {
  id: number;
  name: string;
  comment: string;
  extra_details: string;
  photo: string | null;
  appointmentRequired: number;
  price: string;
  active: number;
  category: Code;
  clinic: Clinic;
  eligibilities: Code[];
};

export type HealthCarePayload = {
  id?: number | undefined;
  name?: string;
  comment?: string;
  extra_details?: string;
  photo?: string | null;
  appointmentRequired?: number;
  price?: string;
  active?: number;
  clinic_id?: number;
  category_id?: number;
};
