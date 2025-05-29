import { Code } from "@/services/codes/codes.types";
import * as Yup from "yup";

export const useFormSchema = () => {
  const formSchema = Yup.object({
    value: Yup.string().required().label("Value"),
    rank: Yup.number().required().label("Rank"),
    type: Yup.mixed<Code>().required().label("Type"),
    use: Yup.mixed<Code>().required().label("Use"),
    start_date: Yup.mixed<any>().required().label("Start Date"),
    end_date: Yup.mixed<any>().required().label("End Date"),
  });
  return { formSchema };
};

export type Form = Yup.InferType<
  ReturnType<typeof useFormSchema>["formSchema"]
>;
