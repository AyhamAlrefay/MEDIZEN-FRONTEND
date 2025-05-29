import { type ReactNode } from "react";
import { Stack, type StackProps } from "@mui/material";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { type Form, type useFormSchema } from "./validation";
import { ControlledTextField } from "@/shared/components/controlled/ControlledTextField";

export interface FinishedAppointmentFormProps extends StackProps<"form"> {
  actionsComponent?: ReactNode;
  methods: UseFormReturn<Form>;
  formSchema: ReturnType<typeof useFormSchema>["formSchema"];
}

export const FinishedAppointmentForm = (
  props: FinishedAppointmentFormProps
) => {
  const { methods, formSchema, actionsComponent } = props;
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <Stack component="form" {...props}>
        <Stack flexWrap="wrap" gap={2}>
          <ControlledTextField
            controllerProps={{
              control,
              name: "cancellation_reason",
              schema: formSchema,
            }}
          />
        </Stack>
        {actionsComponent}
      </Stack>
    </FormProvider>
  );
};
