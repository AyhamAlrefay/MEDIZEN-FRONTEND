import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().label("Password"),
});

export type loginSchemaType = yup.InferType<typeof loginSchema>;
