import { ControllerProps, FieldValues } from "react-hook-form";

import { useCodesService } from "@/services/codes/codes.service";
import { CodeTypes } from "@/types";
import { ControlledAutocomplete } from "../controlled/ControlledAutocomplete";


interface GenderControlledFieldProps<Form extends FieldValues> {
  controllerProps: Omit<ControllerProps<Form>, "render"> & {
    schema?: unknown;
  };
}
function GenderControlledField<Form extends FieldValues>({
  controllerProps,
}: GenderControlledFieldProps<Form>) {
  const { data, isLoading } = useCodesService()
    .index()
    .useQuery({ code_type_id: CodeTypes.gender }, {});

  return (
    <ControlledAutocomplete
      loading={isLoading}
      isOptionEqualToValue={(op, val) => op.id === val?.id}
      getOptionLabel={(o) => o?.display}
      controllerProps={controllerProps}
      options={data?.data?.codes.data ?? []}
    />
  );
}

export default GenderControlledField;
