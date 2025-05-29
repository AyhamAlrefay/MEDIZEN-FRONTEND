import { HealthCare } from "@/services/healthCare/healthCare.types";
import { Code } from "@/services/codes/codes.types";
import * as Yup from "yup";

export const useFormSchema = () => {
  const formSchema = Yup.object({
    comment: Yup.string().required().label("Comment"),
    health_care_service: Yup.mixed<HealthCare>()
      .required()
      .label("Health Care Service"),
    eligibility: Yup.mixed<Code>().required().label("Eligibility"),
  });

  return { formSchema };
};

export type Form = Yup.InferType<
  ReturnType<typeof useFormSchema>["formSchema"]
>;
