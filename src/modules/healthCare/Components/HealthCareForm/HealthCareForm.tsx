import { useState, type ReactNode } from "react";
import { Stack, type StackProps } from "@mui/material";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { type Form, type useFormSchema } from "./validation";
import { ControlledTextField } from "@/shared/components/controlled/ControlledTextField";
import { ControlledNumberField } from "@/shared/components/controlled/ControlledNumberField";
import { ControlledSwitch } from "@/shared/components/controlled/ControlledSwitchField";
import ClinicTypeControlledField from "@/shared/components/common/ClinicControlledField";
import CategoryTypeControlledField from "@/shared/components/common/CategoryControlledField";
import HealthCareImage from "./HealthCareImage";
export interface HealthCareFormProps extends StackProps<"form"> {
  actionsComponent?: ReactNode;
  methods: UseFormReturn<Form>;
  formSchema: ReturnType<typeof useFormSchema>["formSchema"];
}

export const HealthCareForm = (props: HealthCareFormProps) => {
  const { methods, formSchema, actionsComponent } = props;
  const { control } = methods;

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
        <Stack direction="row" flexWrap="wrap" columnGap={2}>
          <Stack flex={2} p={4}>
            <HealthCareImage />
          </Stack>
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
                  name: "comment",
                  schema: formSchema,
                }}
              />
              <ControlledTextField
                controllerProps={{
                  control,
                  name: "extra_details",
                  schema: formSchema,
                }}
              />
              <ControlledNumberField
                controllerProps={{
                  control,
                  name: "price",
                  schema: formSchema,
                }}
              />

              <ClinicTypeControlledField
                controllerProps={{
                  control,
                  name: "clinic",
                  schema: formSchema,
                }}
              />
              <CategoryTypeControlledField
                controllerProps={{
                  control,
                  name: "category",
                  schema: formSchema,
                }}
              />
              <Stack direction={"row"} columnGap={3}>
                <ControlledSwitch
                  controllerProps={{
                    control,
                    name: "appointmentRequired",
                    schema: formSchema,
                  }}
                />
                <ControlledSwitch
                  controllerProps={{
                    control,
                    name: "active",
                    schema: formSchema,
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        {actionsComponent}
      </Stack>
    </FormProvider>
  );
};
