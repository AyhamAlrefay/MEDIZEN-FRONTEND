import { ControllerProps, FieldValues } from "react-hook-form";
import { ControlledAutocomplete } from "@/shared/components/controlled/ControlledAutocomplete";
import { useSlotsService } from "@/services/slots/slots.service";
import { Slot } from "@/services/slots/slots.types";

interface SlotControlledFieldProps<Form extends FieldValues> {
  controllerProps: Omit<ControllerProps<Form>, "render"> & {
    schema?: unknown;
  };
}

function SlotControlledField<Form extends FieldValues>({
  controllerProps,
}: SlotControlledFieldProps<Form>) {
  const { data, isLoading } = useSlotsService().index().useQuery();

  return (
    <ControlledAutocomplete
      loading={isLoading}
      isOptionEqualToValue={(op, val) => op.id === val?.id}
      getOptionLabel={(o: Slot) => o?.status.display}
      controllerProps={controllerProps}
      options={data?.data?.slots ?? []}
      ListboxProps={{ sx: { maxHeight: 150 } }}
    />
  );
}

export default SlotControlledField;
