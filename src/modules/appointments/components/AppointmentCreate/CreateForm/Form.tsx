import { Stack, type StackProps } from "@mui/material";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { type Form, type useFormSchema } from "./validation";
import Steeper from "../Stepper";

export interface AppointmentsFormProps extends StackProps<"form"> {
  methods: UseFormReturn<Form>;
  formSchema: ReturnType<typeof useFormSchema>["formSchema"];
  isLoading: boolean;
}

export const AppointmentForm = (props: AppointmentsFormProps) => {
  const { methods, formSchema, isLoading } = props;
  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        mt={3}
        {...props}
        sx={{ marginX: "auto" }}
        width="90%"
        justifyContent={"space-between"}
      >
        <Steeper
          formSchema={formSchema}
          methods={methods}
          isLoading={isLoading}
        />
      </Stack>
    </FormProvider>
  );
};
