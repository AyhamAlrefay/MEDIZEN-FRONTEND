import { Code } from "@/services/codes/codes.types";
import * as Yup from "yup";

export const useFormSchema = () => {
  const formSchema = Yup.object({
    version: Yup.string().required().label("Version"),
    name: Yup.string().required().label("Name"),
    title: Yup.string().required().label("Title"),
    description: Yup.string().required().label("Description"),
    purpose: Yup.string().required().label("Purpose"),
    last_renew_date: Yup.mixed<any>().label("Last Renew Date"),
    preferred_report_name: Yup.string()
      .required()
      .label("Preferred Report Name"),
    type: Yup.mixed<Code>().required().label("Type"),
    status: Yup.mixed<Code>().required().label("Status"),
    classification: Yup.mixed<Code>().required().label("Classification"),
    method: Yup.mixed<Code>().required().label("Method"),
    body_site: Yup.mixed<Code>().required().label("Body Site"),
    permitted_unit: Yup.mixed<Code>().required().label("Permitted Unit"),
  });
  return { formSchema };
};

export type Form = Yup.InferType<
  ReturnType<typeof useFormSchema>["formSchema"]
>;
