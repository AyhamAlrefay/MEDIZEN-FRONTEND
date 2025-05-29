import { Clinic } from "../clinics/clinics.types";
import { Code } from "../codes/codes.types";

export type ObservationDefinitions = {
  id: number;
  version: string;
  name: string;
  title: string;
  description: string;
  purpose: string;
  last_renew_date: null | string;
  preferred_report_name: string;
  type: Code;
  status: Code;
  classification: Code;
  method: Code;
  body_site: Code;
  permitted_unit: Code;
};

export type ObservationDefinitionsPayload = {
  version?: string;
  name?: string;
  title?: string;
  description?: string;
  purpose?: string;
  last_renew_date?: null | string;
  preferred_report_name?: string;
  type_id?: number;
  status_id?: number;
  classification_id?: number;
  method_id?: number;
  body_site_id?: number;
  permitted_unit_id?: number;
};
