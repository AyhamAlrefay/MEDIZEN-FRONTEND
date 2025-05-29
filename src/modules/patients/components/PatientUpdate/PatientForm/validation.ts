import { Code } from "@/services/codes/codes.types";
import * as Yup from "yup";

export const useFormSchema = () => {
  const formSchema = Yup.object({
    text: Yup.string().required().label("Text"),
    family: Yup.string().required().label("Family"),
    given: Yup.string().required().label("Given"),
    prefix: Yup.string().required().label("Prefix"),
    date_of_birth: Yup.mixed<any>().required().label("Date Of Birth"),
    height: Yup.number().required().label("Height"),
    weight: Yup.number().required().label("Weight"),
    smoker: Yup.number().required().label("Smoker"),
    alcohol_drinker: Yup.number().required().label("Alcohol Drinker"),
    gender: Yup.mixed<Code>().required().label("Gender"),
    marital_status: Yup.mixed<Code>().required().label("Marital Status"),
    blood: Yup.mixed<Code>().required().label("Blood"),
  });
  return { formSchema };
};

export type Form = Yup.InferType<
  ReturnType<typeof useFormSchema>["formSchema"]
>;
