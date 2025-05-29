import { type ReactNode } from "react";
import { Stack, type StackProps } from "@mui/material";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { type Form, type useFormSchema } from "./validation";
import { ControlledTextField } from "@/shared/components/controlled/ControlledTextField";
import { ControlledDateField } from "@/shared/components/controlled/ControlledDateField";

export interface ObservationDefinitionsFormProps extends StackProps<"form"> {
  actionsComponent?: ReactNode;
  methods: UseFormReturn<Form>;
  formSchema: ReturnType<typeof useFormSchema>["formSchema"];
}

export const ObservationDefinitionsForm = (
  props: ObservationDefinitionsFormProps
) => {
  const { methods, formSchema, actionsComponent } = props;
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        mt={3}
        {...props}
        sx={{ marginX: "auto" }}
        width="80%"
      >
        <Stack direction="row" flexWrap="wrap" columnGap={2}>
          <Stack flex={8}>
            <Stack
              display="grid"
              columnGap={6}
              rowGap={3}
              sx={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
            >
              <ControlledTextField
                controllerProps={{
                  control,
                  name: "name",
                  schema: formSchema,
                }}
              />
              <ControlledTextField
                controllerProps={{
                  control,
                  name: "title",
                  schema: formSchema,
                }}
              />
              <ControlledTextField
                controllerProps={{
                  control,
                  name: "version",
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
                  name: "purpose",
                  schema: formSchema,
                }}
              />
              <ControlledTextField
                controllerProps={{
                  control,
                  name: "preferred_report_name",
                  schema: formSchema,
                }}
              />
              <ControlledDateField
                controllerProps={{
                  control,
                  name: "last_renew_date",
                  schema: formSchema,
                }}
              />
            </Stack>
          </Stack>
        </Stack>
        {actionsComponent}
      </Stack>
    </FormProvider>
  );
};
