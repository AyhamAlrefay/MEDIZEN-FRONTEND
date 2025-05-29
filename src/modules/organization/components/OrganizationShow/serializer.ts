import { type Form } from "./validation";
import { omitBy, pick } from "lodash-es";
import dayjs from "dayjs";
import {
  Organization,
  OrganizationPayload,
} from "@/services/organization/organization.types";
/**
 * Description
 * - determine how data will be processed and formatted for the back-end
 */
export const serializer = (input: Form): OrganizationPayload => {
  const { ...data } = input;

  if (data.begin_of_work)
    data.begin_of_work = dayjs(data.begin_of_work).format("HH:mm");
  if (data.end_of_work)
    data.end_of_work = dayjs(data.end_of_work).format("HH:mm");

  const cleanedData = omitBy(data, (value) => value === "");

  const deserializedData = {
    ...cleanedData,
  };

  return deserializedData;
};

/**
 * Description
 * - determine how data will be processed and formatted for the front-end
 */

export const deserializer = (user: Organization): Form => {
  return pick(
    {
      ...user,
      begin_of_work: user?.begin_of_work
        ? dayjs(user.begin_of_work, "HH:mm")
        : null,
      end_of_work: user?.end_of_work ? dayjs(user.end_of_work, "HH:mm") : null,
    },
    [
      "name",
      "aliase",
      "description",
      "type",
      "phone",
      "address",
      "begin_of_work",
      "end_of_work",
      "active",
    ],
  );
};
