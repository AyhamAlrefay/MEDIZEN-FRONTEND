import { ControllerProps, FieldValues } from "react-hook-form";

import { useCodesService } from "@/services/codes/codes.service";
import { CodeTypes } from "@/types";
import { ControlledAutocomplete } from "@/shared/components/controlled/ControlledAutocomplete";

interface TelecomTypesControlledFieldProps<Form extends FieldValues> {
  controllerProps: Omit<ControllerProps<Form>, "render"> & {
    schema?: unknown;
  };
}
function TelecomTypesControlledField<Form extends FieldValues>({
  controllerProps,
}: TelecomTypesControlledFieldProps<Form>) {
  const { data, isLoading } = useCodesService()
    .index()
    .useQuery({ code_type_id: CodeTypes.telecomType }, {});

  return (
    <ControlledAutocomplete
      loading={isLoading}
      isOptionEqualToValue={(op, val) => op.id === val?.id}
      getOptionLabel={(o) => o?.display}
      controllerProps={controllerProps}
      options={data?.data?.codes?.data ?? []}
      ListboxProps={{ sx: { maxHeight: 150 } }}
    />
  );
}

export default TelecomTypesControlledField;
