import { ControllerProps, FieldValues } from "react-hook-form";
import { ControlledAutocomplete } from "@/shared/components/controlled/ControlledAutocomplete";
import { usePatientService } from "@/services/patients/patients.service";
import { Patient } from "@/services/patients/patients.types";

interface PatientControlledFieldProps<Form extends FieldValues> {
  controllerProps: Omit<ControllerProps<Form>, "render"> & {
    schema?: unknown;
  };
}

const renderFullName = (item: Patient) =>
  `${item?.prefix ?? ""} ${item?.f_name ?? ""} ${item?.l_name ?? ""} ${item?.suffix ?? ""}`;

function PatientControlledField<Form extends FieldValues>({
  controllerProps,
}: PatientControlledFieldProps<Form>) {
  const { data, isLoading } = usePatientService().index().useQuery({});

  return (
    <ControlledAutocomplete
      loading={isLoading}
      isOptionEqualToValue={(op, val) => op.id === val?.id}
      getOptionLabel={(o: Patient) => renderFullName(o)}
      controllerProps={controllerProps}
      options={data?.data?.patients?.data ?? []}
      ListboxProps={{ sx: { maxHeight: 150 } }}
    />
  );
}

export default PatientControlledField;
