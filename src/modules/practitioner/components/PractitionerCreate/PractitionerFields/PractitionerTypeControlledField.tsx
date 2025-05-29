import { ControllerProps, FieldValues } from "react-hook-form";

import { useCodesService } from "@/services/codes/codes.service";
import { CodeTypes } from "@/types";
import { ControlledAutocomplete } from "@/shared/components/controlled/ControlledAutocomplete";

interface PractitionerTypesControlledFieldProps<Form extends FieldValues> {
  controllerProps: Omit<ControllerProps<Form>, "render"> & {
    schema?: unknown;
  };
}
function PractitionerTypesControlledField<Form extends FieldValues>({
  controllerProps,
}: PractitionerTypesControlledFieldProps<Form>) {
  const { data, isLoading } = useCodesService()
    .index()
    .useQuery({ code_type_id: CodeTypes.gender }, {});
  console.log(data?.data);

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

export default PractitionerTypesControlledField;
