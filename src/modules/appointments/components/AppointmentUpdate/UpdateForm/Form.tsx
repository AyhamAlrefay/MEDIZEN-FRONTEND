import { type ReactNode } from "react";
import { Stack, type StackProps } from "@mui/material";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { type Form, type useFormSchema } from "./validation";
import { ControlledTextField } from "@/shared/components/controlled/ControlledTextField";

export interface AppointmentFormProps extends StackProps<"form"> {
  actionsComponent?: ReactNode;
  methods: UseFormReturn<Form>;
  formSchema: ReturnType<typeof useFormSchema>["formSchema"];
}

export const AppointmentsForm = (props: AppointmentFormProps) => {
  const { methods, formSchema, actionsComponent } = props;
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        mt={4}
        {...props}
        sx={{ marginX: "auto" }}
        width="80%"
      >
        <Stack rowGap={4}>
          <ControlledTextField
            controllerProps={{
              control,
              name: "reason",
              schema: formSchema,
            }}
          />
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
        {actionsComponent}
      </Stack>
    </FormProvider>
  );
};
