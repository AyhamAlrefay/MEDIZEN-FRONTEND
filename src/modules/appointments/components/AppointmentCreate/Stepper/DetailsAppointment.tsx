import { Stack, Typography } from "@mui/material";
import { useFormSchema } from "../CreateForm/validation";
import { type Form } from "../CreateForm/validation";
import { type UseFormReturn } from "react-hook-form";
import { ControlledTextField } from "@/shared/components/controlled/ControlledTextField";
import { ControlledDateField } from "@/shared/components/controlled/ControlledDateField";
import PatientControlledField from "../AppointmentFields/PatientControlledField";
import { Code } from "@/services/codes/codes.types";
import SlotSelect from "./SlotSelect";
interface StepProps {
  methods: UseFormReturn<Form>;
  formSchema: ReturnType<typeof useFormSchema>["formSchema"];
}
const RenderFields = ({ methods, formSchema }: StepProps) => {
  const type: Code = methods.watch("type");
  const { control } = methods;
  if (type.code !== "predefined")
    return (
      <Stack
        display="grid"
        columnGap={6}
        rowGap={3}
        sx={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
      >
        <ControlledDateField
          controllerProps={{
            control,
            name: "start_date",
            schema: formSchema,
          }}
        />
        <ControlledDateField
          controllerProps={{
            control,
            name: "end_date",
            schema: formSchema,
          }}
        />
      </Stack>
    );
  else return <SlotSelect methods={methods} />;
};

const DetailsAppointment = ({ methods, formSchema }: StepProps) => {
  const { control } = methods;
  return (
    <Stack spacing={2}>
      <Typography variant="h6" color="primary">
        Select date and enter details appointment
      </Typography>
      <Stack
        sx={{
          width: "90%",
          alignSelf: "center",
        }}
        rowGap={4}
      >
        <RenderFields methods={methods} formSchema={formSchema} />
        <Stack
          display="grid"
          columnGap={6}
          rowGap={3}
          sx={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
        >
          <PatientControlledField
            controllerProps={{
              control,
              name: "patient",
              schema: formSchema,
            }}
          />
          <ControlledTextField
            controllerProps={{
              control,
              name: "reason",
              schema: formSchema,
            }}
          />
        </Stack>
        <Stack
          display="grid"
          columnGap={6}
          rowGap={3}
          sx={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
        >
          <ControlledTextField
            controllerProps={{
              control,
              name: "description",
              schema: formSchema,
            }}
          />
          <ControlledTextField
            controllerProps={{
              control,
              name: "note",
              schema: formSchema,
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DetailsAppointment;
