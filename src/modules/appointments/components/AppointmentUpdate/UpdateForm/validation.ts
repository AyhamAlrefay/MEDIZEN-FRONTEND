import { Code } from "@/services/codes/codes.types";
import { Patient } from "@/services/patients/patients.types";
import * as Yup from "yup";

export const useFormSchema = () => {
  const formSchema = Yup.object({
    reason: Yup.string().required().label("Reason"),
    description: Yup.string().required().label("Description"),
    note: Yup.string().required().label("Note"),
  });

  return { formSchema };
};

export type Form = Yup.InferType<
  ReturnType<typeof useFormSchema>["formSchema"]
>;
