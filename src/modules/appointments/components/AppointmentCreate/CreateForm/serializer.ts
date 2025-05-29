import {
  AppointmentPayload,
  Appointments,
} from "@/services/appointments/appointments.types";
import { type Form } from "./validation";
import { omitBy, pick } from "lodash-es";
import dayjs from "dayjs";

/**
 * Description
 * - determine how data will be processed and formatted for the back-end
 */
export const serializer = (input: Form): AppointmentPayload => {
  const { clinic_id, type, patient, ...data } = input;

  const FilterData = (data: any) => {
    if (type.code !== "predefined") {
      data.start_date = dayjs(data.start_date).format("YYYY-MM-DD");
      data.end_date = dayjs(data.end_date).format("YYYY-MM-DD");
      const { slot_id, ...rest } = data;
      return {
        type_id: type.id,
        ...rest,
      };
    } else {
      const { start_date, end_date, ...rest } = data;
      return rest;
    }
  };

  const cleanedData = omitBy(FilterData(data), (value) => value === "");

  const deserializedData = {
    patient_id: patient?.id,
    ...cleanedData,
  };

  return deserializedData;
};
