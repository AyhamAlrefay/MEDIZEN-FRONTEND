import {
  ObservationDefinitionsPayload,
  ObservationDefinitions,
} from "@/services/observationDefinitions/observationDefinitions.types";
import {} from "@/services/observationDefinitions/observationDefinitions.types";
import { type Form } from "./validation";
import { omitBy, pick } from "lodash-es";
import dayjs from "dayjs";
/**
 * Description
 * - determine how data will be processed and formatted for the back-end
 */
export const serializer = (input: Form): ObservationDefinitionsPayload => {
  const {
    type,
    body_site,
    classification,
    permitted_unit,
    status,
    method,
    ...data
  } = input;

  if (data?.last_renew_date)
    data.last_renew_date = dayjs(input.last_renew_date).format("YYYY-MM-DD");

  const cleanedData = omitBy(data, (value) => value === "");

  const deserializedData = {
    type_id: type?.id,
    body_site_id: body_site?.id,
    classification_id: classification?.id,
    permitted_unit_id: permitted_unit?.id,
    status_id: status?.id,
    method_id: method?.id,
    ...cleanedData,
  };

  return deserializedData;
};

/**
 * Description
 * - determine how data will be processed and formatted for the front-end
 */

export const deserializer = (
  observationDefinition: ObservationDefinitions
): Form => {
  return pick(
    {
      ...observationDefinition,
      last_renew_date: observationDefinition?.last_renew_date
        ? dayjs(observationDefinition?.last_renew_date)
        : null,
    },
    [
      "name",
      "version",
      "name",
      "title",
      "description",
      "purpose",
      "last_renew_date",
      "preferred_report_name",
      "type",
      "status",
      "classification",
      "method",
      "body_site",
      "permitted_unit",
    ]
  );
};
