import { Clinic } from "@/services/clinics/clinics.types";
import { Code } from "@/services/codes/codes.types";
import * as Yup from "yup";

export const useFormSchema = () => {
  const formSchema = Yup.object({
    name: Yup.string().required().label("Name"),
    comment: Yup.string().required().label("Comment"),
    extra_details: Yup.string().required().label("Extra_details"),
    appointmentRequired: Yup.number()
      .required()
      .default(0)
      .label("Appointment Required"),
    active: Yup.number().required().default(0).label("Active"),
    price: Yup.string().required().label("Price"),
    clinic: Yup.mixed<Clinic>().required().label("Clinic"),
    category: Yup.mixed<Code>().required().label("Category"),
    photo: Yup.mixed().optional().nullable(),
  });

  return { formSchema };
};

export type Form = Yup.InferType<
  ReturnType<typeof useFormSchema>["formSchema"]
>;
