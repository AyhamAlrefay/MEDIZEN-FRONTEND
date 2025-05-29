import {
  QualifiedValues,
  QualifiedValuesPayload,
} from "@/services/qualifiedValues/qualifiedValues.types";
import { type Form } from "./validation";
import { pick } from "lodash-es";
/**
 * Description
 * - determine how data will be processed and formatted for the back-end
 */
export const serializer = (input: Form): QualifiedValuesPayload => {
  const {
    applies_to,
    context,
    gender,
    range_category,

    ...data
  } = input;
  const deserializedData = {
    applies_to_id: applies_to.id,
    context_id: context.id,
    gender_id: gender.id,
    range_category_id: range_category.id,
    ...data,
  };

  return deserializedData;
};

/**
 * Description
 * - determine how data will be processed and formatted for the front-end
 */

export const deserializer = (qualifiedValues: QualifiedValues): Form => {
  return pick(qualifiedValues, [
    "age_range",
    "value_range",
    "context",
    "applies_to",
    "gender",
    "range_category",
  ]);
};
