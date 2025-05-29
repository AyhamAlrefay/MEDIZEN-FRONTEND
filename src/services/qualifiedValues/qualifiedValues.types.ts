import { Code } from "../codes/codes.types";

type RangeItem = {
  value: number;
  unit: string;
};

export type Range = {
  low: RangeItem;
  high: RangeItem;
};

export type QualifiedValues = {
  id: number;
  age_range: Range;
  value_range: Range;
  context: Code;
  applies_to: Code;
  gender: Code;
  range_category: Code;
};

export type QualifiedValuesPayload = {
  age_range?: Range;
  value_range?: Range;
  context_id?: number;
  applies_to_id?: number;
  gender_id?: number;
  range_category_id?: number;
};
