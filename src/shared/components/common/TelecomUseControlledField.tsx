import { ControllerProps, FieldValues } from "react-hook-form";

import { useCodesService } from "@/services/codes/codes.service";
import { CodeTypes } from "@/types";
import { ControlledAutocomplete } from "../controlled/ControlledAutocomplete";

interface telecomUseControlledFieldProps<Form extends FieldValues> {
  controllerProps: Omit<ControllerProps<Form>, "render"> & {
    schema?: unknown;
  };
}
function TelecomUseControlledField<Form extends FieldValues>({
  controllerProps,
}: telecomUseControlledFieldProps<Form>) {
  const { data, isLoading } = useCodesService()
    .index()
    .useQuery({ code_type_id: CodeTypes.telecomUse }, {});

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

export default TelecomUseControlledField;
