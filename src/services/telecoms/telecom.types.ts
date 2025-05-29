import { Code } from "../codes/codes.types";

export type Telecom = {
  id: number;
  value: string;
  rank: number;
  start_date: string;
  end_date: string | null;
  type: Code;
  use: Code;
};

export type TelecomPayload = {
  value?: string | undefined;
  rank?: number | undefined;
  start_date?: number | undefined;
  end_date?: number | undefined;
  type_id?: number | undefined;
  use_id?: number | undefined;
};
