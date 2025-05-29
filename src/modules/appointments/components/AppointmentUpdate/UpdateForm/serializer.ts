import {
  AppointmentPayload,
  Appointments,
} from "@/services/appointments/appointments.types";
import { type Form } from "./validation";
import { omitBy, pick } from "lodash-es";

/**
 * Description
 * - determine how data will be processed and formatted for the back-end
 */
export const serializer = (input: Form): AppointmentPayload => {
  const cleanedData = omitBy(input, (value) => value === "");

  const deserializedData = {
    ...cleanedData,
  };

  return deserializedData;
};

/**
 * Description
 * - determine how data will be processed and formatted for the front-end
 */
export const deserializer = (appointment: Appointments): Form => {
  return pick(appointment, ["note", "description", "reason"]);
};
