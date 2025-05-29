import { ControllerProps, FieldValues } from "react-hook-form";

import { useCodesService } from "@/services/codes/codes.service";
import { CodeTypes } from "@/types";
import { ControlledAutocomplete } from "../controlled/ControlledAutocomplete";

interface BloodControlledFieldProps<Form extends FieldValues> {
  controllerProps: Omit<ControllerProps<Form>, "render"> & {
    schema?: unknown;
  };
}
function BloodControlledField<Form extends FieldValues>({
  controllerProps,
}: BloodControlledFieldProps<Form>) {
  const { data, isLoading } = useCodesService()
    .index()
    .useQuery({ code_type_id: CodeTypes.bloodGroup }, {});

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

export default BloodControlledField;
