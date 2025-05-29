import { type Form } from "./validation";
import { omitBy, pick } from "lodash-es";
import {
  HealthCareEligibilty,
  HealthCareEligibiltyPayload,
} from "@/services/healthCareEligibilty/healthCareEligibilty.types";
/**
 * Description
 * - determine how data will be processed and formatted for the back-end
 */
export const serializer = (input: Form): HealthCareEligibiltyPayload => {
  const { health_care_service, eligibility } = input;

  const cleanedData = omitBy(input, (value) => value === "");

  const deserializedData = {
    ...cleanedData,
    health_care_service_id: health_care_service?.id,
    eligibility_id: eligibility?.id,
  };

  return deserializedData;
};

/**
 * Description
 * - determine how data will be processed and formatted for the front-end
 */

export const deserializer = (
  healthCareEligibilty: HealthCareEligibilty,
): any => {
  return pick(healthCareEligibilty, [
    "comment",
    "health_care_service",
    "eligibility",
  ]);
};
