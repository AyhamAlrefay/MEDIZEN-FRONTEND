import { Code } from "@/services/codes/codes.types";
import * as Yup from "yup";

const rangeItemSchema = Yup.object({
  value: Yup.number().required("Required"),
  unit: Yup.string().required("Required"),
});

export const RangeSchema = Yup.object({
  low: rangeItemSchema.required(),
  high: rangeItemSchema.required(),
});

export const useFormSchema = () => {
  const formSchema = Yup.object({
    age_range: RangeSchema.required().label("Age Range"),
    value_range: RangeSchema.required().label("Value Range"),
    context: Yup.mixed<Code>().required().label("Context"),
    applies_to: Yup.mixed<Code>().required().label("Applies To"),
    gender: Yup.mixed<Code>().required().label("Gender"),
    range_category: Yup.mixed<Code>().required().label("Range Category"),
  });
  return { formSchema };
};

export type Form = Yup.InferType<
  ReturnType<typeof useFormSchema>["formSchema"]
>;
