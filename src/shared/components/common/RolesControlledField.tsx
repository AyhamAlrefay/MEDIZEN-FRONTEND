import { ControllerProps, FieldValues } from "react-hook-form";
import { ControlledAutocomplete } from "../controlled/ControlledAutocomplete";
import { useRolesService } from "@/services/roles/roles.service";

interface RolesControlledFieldProps<Form extends FieldValues> {
  controllerProps: Omit<ControllerProps<Form>, "render"> & {
    schema?: unknown;
  };
}

function RolesControlledField<Form extends FieldValues>({
  controllerProps,
}: RolesControlledFieldProps<Form>) {
  const { data, isLoading } = useRolesService().index().useQuery();

  return (
    <ControlledAutocomplete
      disablePortal
      loading={isLoading}
      isOptionEqualToValue={(op, val) => op.id === val?.id}
      getOptionLabel={(o) => o?.name}
      controllerProps={controllerProps}
      options={data?.data?.roles?.data ?? []}
      slotProps={{popper:{
          disablePortal: false,
        },
      }}
    />
  );
}

export default RolesControlledField;
