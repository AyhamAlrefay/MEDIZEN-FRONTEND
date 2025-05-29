import { ControllerProps, FieldValues } from "react-hook-form";
import { ControlledAutocomplete } from "../controlled/ControlledAutocomplete";
import { useClinicsService } from "@/services/clinics/clinics.service";

interface ClinicControlledFieldProps<Form extends FieldValues> {
  controllerProps: Omit<ControllerProps<Form>, "render"> & {
    schema?: unknown;
  };
}

function ClinicControlledField<Form extends FieldValues>({
  controllerProps,
}: ClinicControlledFieldProps<Form>) {
  const { data, isLoading } = useClinicsService().index().useQuery();

  return (
    <ControlledAutocomplete
      loading={isLoading}
      isOptionEqualToValue={(op, val) => op.id === val?.id}
      getOptionLabel={(o) => o?.name}
      controllerProps={controllerProps}
      options={data?.data?.clinics?.data ?? []}
    />
  );
}

export default ClinicControlledField;
