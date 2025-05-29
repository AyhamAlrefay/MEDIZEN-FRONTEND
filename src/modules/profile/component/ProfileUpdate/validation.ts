import { Code } from "@/services/codes/codes.types";
import * as Yup from "yup";

export const useFormSchema = () => {
  const formSchema = Yup.object({
    f_name: Yup.string().required().label("First name"),
    l_name: Yup.string().required().label("Last name"),
    prefix: Yup.string().label("Prefix").optional(),
    suffix: Yup.string().label("Suffix").optional(),
    address: Yup.string().label("Address").optional(),
    date_of_birth: Yup.mixed<any>().required().label("Date of birth"),
    text: Yup.string().label("Description").optional(),
    avatar: Yup.mixed().optional().nullable(),
    gender: Yup.mixed<Code>().optional(),
  });
  return { formSchema };
};

export type Form = Yup.InferType<
  ReturnType<typeof useFormSchema>["formSchema"]
>;
