import { Clinic } from "@/services/clinics/clinics.types";
import { Code } from "@/services/codes/codes.types";
import { Role } from "@/services/roles/roles.types";
import * as Yup from "yup";

export const useFormSchema = () => {
  const formSchema = Yup.object({
    f_name: Yup.string().required().label("First Name"),
    l_name: Yup.string().required().label("Last Name"),
    gender: Yup.mixed<Code>().required().label("Gender"),
    role: Yup.mixed<Role>().required().label("Role"),
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().min(8).required().label("Password"),
    date_of_birth: Yup.mixed<any>().required().label("Date Of Birth"),
    clinic: Yup.mixed<Clinic>().notRequired().label("Clinic"),
  });
  return { formSchema };
};

export type Form = Yup.InferType<
  ReturnType<typeof useFormSchema>["formSchema"]
>;
