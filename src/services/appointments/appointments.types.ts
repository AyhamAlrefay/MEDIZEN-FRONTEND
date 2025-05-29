import { Practitioner } from "@/services/practitioner/practitioner.types";
import { Code } from "../codes/codes.types";
import { Patient } from "../patients/patients.types";

type Doctor = {
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
  active: number;
};

export type Appointments = {
  id: number;
  reason: string;
  description: string;
  start_date: string;
  end_date: string;
  minutes_duration: number;
  note: string;
  cancellation_date: string | null;
  cancellation_reason: string | null;
  previous_appointment: string | null;
  created_by_practitioner: Practitioner | null;
  type: Code;
  status: Code;
  patient: Patient;
  doctor: Doctor;
};

export type AppointmentPayload = {
  reason?: string;
  description?: string;
  note?: string;
  doctor_id?: number;
  patient_id?: number;
  start_date?: string;
  end_date?: string;
  type_id?: number;
  slot_id?: number;
};
