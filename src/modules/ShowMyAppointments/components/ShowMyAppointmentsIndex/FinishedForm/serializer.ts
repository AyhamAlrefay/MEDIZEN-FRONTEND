import { type Form } from "./validation";
import { omitBy } from "lodash-es";
import { finishAppointmentsPayload } from "@/services/showMyAppointment/showMyAppointment.types";
/**
 * Description
 * - determine how data will be processed and formatted for the back-end
 */
export const serializer = (input: Form): finishAppointmentsPayload => {
  const cleanedData = omitBy(input, (value) => value === "");
  const deserializedData = {
    ...cleanedData,
  };

  return deserializedData;
};
