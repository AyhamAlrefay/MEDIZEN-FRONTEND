import { HealthCare } from "../healthCare/healthCare.types";

export type showMyClinic = {
  id: number;
  name: string;
  description: string;
  photo: string | null;
  active: number;
  healthCareServices: HealthCare[];
};
