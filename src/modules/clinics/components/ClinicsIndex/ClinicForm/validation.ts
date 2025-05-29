import * as Yup from "yup";

export const useFormSchema = ({ mode }: { mode: "create" | "update" }) => {
  const formSchema = Yup.object({
    name: Yup.string().required().label("Name"),
    description: Yup.string().required().label("Description"),
    photo: Yup.mixed().test({
      name: "required-in-create",
      message: "Photo is required",
      test: function (value) {
        return mode !== "create" || !!value;
      },
    }),
    active: Yup.number().optional().nullable().label("Active"),
  }).concat(Yup.object().shape({}).meta({ mode }));
  return { formSchema };
};

export type Form = Yup.InferType<
  ReturnType<typeof useFormSchema>["formSchema"]
>;
