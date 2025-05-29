import { type Form } from "./validation";
import { omitBy, pick } from "lodash-es";
import dayjs from "dayjs";
import {
  Practitioner,
  PractitionerPayload,
} from "@/services/practitioner/practitioner.types";
/**
 * Description
 * - determine how data will be processed and formatted for the back-end
 */
export const serializer = (input: Form): PractitionerPayload => {
  const { clinic, gender, role, ...data } = input;

  if (data?.date_of_birth)
    data.date_of_birth = dayjs(data.date_of_birth).format("YYYY-MM-DD");

  const cleanedData = omitBy(data, (value) => value === "");

  const deserializedData = {
    ...cleanedData,
    clinic_id: clinic?.id,
    gender_id: gender?.id,
    role_id: role?.id,
  };

  return deserializedData;
};

/**
 * Description
 * - determine how data will be processed and formatted for the front-end
 */

//  f_name: Yup.string().required().label("First Name"),
//     l_name: Yup.string().required().label("Last Name"),
//     gender: Yup.number().required().label("Gender"),
//     role_id: Yup.string().required().label("Role"),
//     email: Yup.string().email().required().label("Email"),
//     password: Yup.string().required().label("Password"),
//     date_of_birth: Yup.mixed<any>().required().label("Date Of Birth"),
export const deserializer = (Practitioner: Practitioner): any => {
  return pick(
    {
      ...Practitioner,
      date_of_birth: Practitioner?.date_of_birth
        ? dayjs(Practitioner?.date_of_birth)
        : null,
    },
    [
      "f_name",
      "l_name",
      "gender",
      "role",
      "email",
      "password",
      "date_of_birth",
      "clinic",
    ],
  );
};
