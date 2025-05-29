import { type Form } from "./validation";
import { omitBy, pick } from "lodash-es";
import { Clinic, ClinicPayload } from "@/services/clinics/clinics.types";
/**
 * Description
 * - determine how data will be processed and formatted for the back-end
 */
export const serializer = (input: Form): ClinicPayload => {
  const { ...data } = input;

  if (typeof data.photo === "string") delete data.photo;
  if (!!input.active) {
    data.active = input.active;
  } else data.active = 1;

  const cleanedData = omitBy(data, (value) => value === "");
  const deserializedData: any = {
    ...cleanedData,
    organization_id: 1,
  };

  return deserializedData;
};

/**
 * Description
 * - determine how data will be processed and formatted for the front-end
 */

export const deserializer = (clinic: Clinic): Form => {
  return pick(
    {
      ...clinic,
    },
    ["name", "description", "active", "photo"],
  );
};
