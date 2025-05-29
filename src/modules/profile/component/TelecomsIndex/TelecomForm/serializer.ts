import { type Form } from "./validation";
import { omitBy, pick } from "lodash-es";
import dayjs from "dayjs";
import { Telecom, TelecomPayload } from "@/services/telecoms/telecom.types";
/**
 * Description
 * - determine how data will be processed and formatted for the back-end
 */
export const serializer = (input: Form): TelecomPayload => {
  const { type, use, ...data } = input;

  if (data?.start_date)
    data.start_date = dayjs(data.start_date).format("YYYY-MM-DD");

  if (data?.end_date) data.end_date = dayjs(data.end_date).format("YYYY-MM-DD");

  const cleanedData = omitBy(data, (value) => value === "");

  const deserializedData = {
    ...cleanedData,
    type_id: type?.id,
    use_id: use?.id,
  };

  return deserializedData;
};

/**
 * Description
 * - determine how data will be processed and formatted for the front-end
 */

export const deserializer = (telecom: Telecom): Form => {
  return pick(
    {
      ...telecom,
      start_date: telecom?.start_date ? dayjs(telecom?.start_date) : null,
      end_date: telecom?.end_date ? dayjs(telecom?.end_date) : null,
    },
    ["value", "rank", "type", "use", "start_date", "end_date"],
  );
};
