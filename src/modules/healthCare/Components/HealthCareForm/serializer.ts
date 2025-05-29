import { type Form } from "./validation";
import { omitBy, pick } from "lodash-es";
import {
  HealthCarePayload,
  HealthCare,
} from "@/services/healthCare/healthCare.types";
/**
 * Description
 * - determine how data will be processed and formatted for the back-end
 */
export const serializer = (input: Form): HealthCarePayload => {
  const { clinic, category, price } = input;
  if (typeof input.photo === "string") delete input.photo;

  const cleanedData = omitBy(input, (value) => value === "");

  const deserializedData = {
    ...cleanedData,
    category_id: category?.id,
    clinic_id: clinic?.id,
    price: String(price),
  };

  return deserializedData;
};

/**
 * Description
 * - determine how data will be processed and formatted for the front-end
 */

export const deserializer = (healthCare: HealthCare): Form => {
  return pick(healthCare, [
    "name",
    "comment",
    "price",
    "extra_details",
    "appointmentRequired",
    "active",
    "photo",
    "category",
    "clinic",
  ]);
};
