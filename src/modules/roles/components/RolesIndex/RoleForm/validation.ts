import { GUARD_NAME_OPTIONS } from "@/services/roles/roles.types";
import * as Yup from "yup";

export const useFormSchema = () => {
  const formSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
  });

  return { formSchema };
};

export type Form = Yup.InferType<
  ReturnType<typeof useFormSchema>["formSchema"]
>;
