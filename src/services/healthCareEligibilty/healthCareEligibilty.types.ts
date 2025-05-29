import { Code } from "../codes/codes.types";
import { HealthCare } from "../healthCare/healthCare.types";

export type HealthCareEligibilty = {
  id: number;
  comment: string;
  health_care_service: HealthCare;
};

export type HealthCareEligibiltyPayload = {
  health_care_service_id?: number;
  eligibility_id?: number;
  comment?: string;
};
