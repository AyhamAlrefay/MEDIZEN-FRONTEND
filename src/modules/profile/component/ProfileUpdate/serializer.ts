import { User, UserUpdateProfilePayload } from "@/services/user/user.types";
import { type Form } from "./validation";
import { omitBy, pick } from "lodash-es";
import dayjs from "dayjs";
/**
 * Description
 * - determine how data will be processed and formatted for the back-end
 */
export const serializer = (input: Form): UserUpdateProfilePayload => {
  const { gender, ...data } = input;
  if (typeof data.avatar === "string") delete data.avatar;

  if (data.date_of_birth)
    data.date_of_birth = dayjs(data.date_of_birth).format("YYYY-MM-DD");

  const cleanedData = omitBy(data, (value) => value === "");

  const deserializedData = {
    ...cleanedData,
    gender_id: gender?.id,
  };

  return deserializedData;
};

/**
 * Description
 * - determine how data will be processed and formatted for the front-end
 */

export const deserializer = (user: User): Form => {
  return pick({ ...user, date_of_birth: dayjs(user?.date_of_birth) }, [
    "f_name",
    "l_name",
    "text",
    "address",
    "gender",
    "suffix",
    "prefix",
    "avatar",
    "date_of_birth",
  ]);
};
