import { Practitioner } from "@/services/practitioner/practitioner.types";
import { Code } from "../codes/codes.types";

type Repeat = {
  dayOfWeek: "fri" | "sat" | "tue" | "wed" | "thu";
  timeOfDay: string;
  duration: number;
};

type Schedule = {
  id: number;
  name: string;
  active: number;
  planning_horizon_start: string;
  planning_horizon_end: string;
  repeat: Repeat[];
  comment: string;
  practitioner: Practitioner;
};

export type Slot = {
  id: number;
  start_date: string;
  end_date: string;
  comment: string | null;
  schedule: Schedule;
  status: Code;
};
