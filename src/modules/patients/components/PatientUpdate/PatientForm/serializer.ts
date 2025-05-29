import { type Form } from "./validation";
import { omitBy, pick } from "lodash-es";
import dayjs from "dayjs";
import { Patient, PatientPayload } from "@/services/patients/patients.types";
/**
 * Description
 * - determine how data will be processed and formatted for the back-end
 */
export const serializer = (input: Form): PatientPayload => {
  const { gender, marital_status, blood } = input;

  if (input?.date_of_birth)
    input.date_of_birth = dayjs(input.date_of_birth).format("YYYY-MM-DD");

  const cleanedData = omitBy(input, (value) => value === "");

  const deserializedData = {
    ...cleanedData,
    marital_status_id: marital_status?.id,
    blood_id: blood?.id,
    gender_id: gender?.id,
  };

  return deserializedData;
};

/**
 * Description
 * - determine how data will be processed and formatted for the front-end
 */

export const deserializer = (patient: Patient): Form => {
  return pick(
    {
      ...patient,
      date_of_birth: patient?.date_of_birth
        ? dayjs(patient?.date_of_birth)
        : null,
    },
    [
      "text",
      "family",
      "given",
      "prefix",
      "height",
      "weight",
      "date_of_birth",
      "smoker",
      "alcohol_drinker",
      "gender",
      "marital_status",
      "blood",
    ],
  );
};
