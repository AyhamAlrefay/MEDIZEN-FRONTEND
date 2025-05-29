export type Organization = {
  name: string;
  aliase: string;
  description: string;
  type: string;
  phone: string;
  address: string;
  begin_of_work: string;
  end_of_work: string;
  active: boolean;
};

export type OrganizationPayload = {
  name?: string | undefined;
  aliase?: string | undefined;
  description?: string | undefined;
  type?: string | undefined;
  phone?: string | undefined;
  address?: string | undefined;
  begin_of_work?: string | undefined;
  end_of_work?: string | undefined;
  active?: boolean | undefined;
};
