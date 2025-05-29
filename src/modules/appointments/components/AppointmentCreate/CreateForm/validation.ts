import { Code } from "@/services/codes/codes.types";
import { Patient } from "@/services/patients/patients.types";
import * as Yup from "yup";

export const useFormSchema = () => {
  const formSchema = Yup.object({
    clinic_id: Yup.number().required().label("Clinic"),
    doctor_id: Yup.number().required().label("Doctor"),
    patient: Yup.mixed<Patient>().required().label("Patient"),
    type: Yup.mixed<Code>().label("Type").required(),
    reason: Yup.string().required().label("Reason"),
    description: Yup.string().required().label("Description"),
    note: Yup.string().required().label("Note"),
    created_by_practitioner: Yup.number().required(),
    slot_id: Yup.number()
      .when("type", {
        is: (val: Code | null) => !val || val.code == "predefined",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .label("Slot"),
    start_date: Yup.mixed<any>()
      .when("type", {
        is: (val: Code | null) => !val || val.code !== "predefined",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .label("Start Date"),

    end_date: Yup.mixed<any>()
      .when("type", {
        is: (val: Code | null) => !val || val.code !== "predefined",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .label("End Date"),
  });

  return { formSchema };
};

export type Form = Yup.InferType<
  ReturnType<typeof useFormSchema>["formSchema"]
>;
