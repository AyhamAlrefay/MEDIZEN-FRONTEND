export type Clinic = {
  id: number;
  name: string;
  description: string;
  photo: string;
  active: number;
};

export type ClinicPayload = {
  id?: number | undefined;
  name?: string | undefined;
  description?: string | undefined;
  photo?: string | undefined;
  active?: number | undefined;
};
