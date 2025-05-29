import * as Yup from "yup";

export const useFormSchema = () => {
  const formSchema = Yup.object({
    name: Yup.string().required().label("Name"),
    aliase: Yup.string().required().label("Aliase"),
    description: Yup.string().required().label("Description"),
    type: Yup.string().label("Type").optional(),
    phone: Yup.string()
      .label("Phone")
      .optional()
      .matches(
        /^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/,
        "Please enter a valid phone number (e.g., +963-939941093 or 0939941093)",
      ),
    address: Yup.string().label("Address").optional(),
    begin_of_work: Yup.mixed<any>().required().label("Begin of work"),
    end_of_work: Yup.mixed<any>().required().label("End of work"),
    active: Yup.boolean().label("Active").optional(),
  });
  return { formSchema };
};

export type Form = Yup.InferType<
  ReturnType<typeof useFormSchema>["formSchema"]
>;
