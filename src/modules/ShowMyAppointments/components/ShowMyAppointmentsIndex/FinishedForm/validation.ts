import * as Yup from "yup";

export const useFormSchema = ({ mode }: { mode: "create" | "update" }) => {
  const formSchema = Yup.object({
    cancellation_reason: Yup.string().required().label("Cancellation Reason"),
  }).concat(Yup.object().shape({}).meta({ mode }));
  return { formSchema };
};

export type Form = Yup.InferType<
  ReturnType<typeof useFormSchema>["formSchema"]
>;
