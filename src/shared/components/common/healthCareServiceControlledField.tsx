import { ControllerProps, FieldValues } from "react-hook-form";
import { ControlledAutocomplete } from "../controlled/ControlledAutocomplete";
import { useHealthCareService } from "@/services/healthCare/healthCare.service";

interface HealthCareServiceControlledFieldProps<Form extends FieldValues> {
  controllerProps: Omit<ControllerProps<Form>, "render"> & {
    schema?: unknown;
  };
}

function HealthCareServiceControlledField<Form extends FieldValues>({
  controllerProps,
}: HealthCareServiceControlledFieldProps<Form>) {
  const { data, isLoading } = useHealthCareService().index().useQuery();

  return (
    <ControlledAutocomplete
      loading={isLoading}
      isOptionEqualToValue={(op, val) => op.id === val?.id}
      getOptionLabel={(o) => o?.name}
      controllerProps={controllerProps}
      options={data?.data?.healthCareServices?.data ?? []}
    />
  );
}

export default HealthCareServiceControlledField;
