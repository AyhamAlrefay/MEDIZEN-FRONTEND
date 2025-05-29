import { type ReactNode } from "react";
import { Stack, type StackProps } from "@mui/material";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { type Form, type useFormSchema } from "./validation";
import { ControlledTextField } from "@/shared/components/controlled/ControlledTextField";
import { ControlledNumberField } from "@/shared/components/controlled/ControlledNumberField";
import { ControlledSwitch } from "@/shared/components/controlled/ControlledSwitchField";
import { ControlledDateField } from "@/shared/components/controlled/ControlledDateField";
import GenderControlledField from "@/shared/components/common/GenderControlledField";
import BloodTypeControlledField from "@/shared/components/common/BloodControlledField";
import MaritalStatusTypeControlledField from "@/shared/components/common/MartialStatusControlledField";

export interface PatientFormProps extends StackProps<"form"> {
  actionsComponent?: ReactNode;
  methods: UseFormReturn<Form>;
  formSchema: ReturnType<typeof useFormSchema>["formSchema"];
}

export const PatientForm = (props: PatientFormProps) => {
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
                  name: "text",
                  schema: formSchema,
                }}
              />
              <ControlledTextField
                controllerProps={{
                  control,
                  name: "family",
                  schema: formSchema,
                }}
              />
              <ControlledTextField
                controllerProps={{
                  control,
                  name: "given",
                  schema: formSchema,
                }}
              />
              <ControlledDateField
                controllerProps={{
                  control,
                  name: "date_of_birth",
                  schema: formSchema,
                }}
              />
              <ControlledTextField
                controllerProps={{
                  control,
                  name: "prefix",
                  schema: formSchema,
                }}
              />
              <GenderControlledField
                controllerProps={{
                  control,
                  name: "gender",
                  schema: formSchema,
                }}
              />
              <BloodTypeControlledField
                controllerProps={{
                  control,
                  name: "blood",
                  schema: formSchema,
                }}
              />
              <MaritalStatusTypeControlledField
                controllerProps={{
                  control,
                  name: "marital_status",
                  schema: formSchema,
                }}
              />
              <Stack direction={"row"} justifyContent="space-around">
                <ControlledNumberField
                  controllerProps={{
                    control,
                    name: "height",
                    schema: formSchema,
                  }}
                />
                <ControlledNumberField
                  controllerProps={{
                    control,
                    name: "weight",
                    schema: formSchema,
                  }}
                />
              </Stack>
              <Stack direction={"row"} justifyContent="space-around">
                <ControlledSwitch
                  controllerProps={{
                    control,
                    name: "smoker",
                    schema: formSchema,
                  }}
                />
                <ControlledSwitch
                  controllerProps={{
                    control,
                    name: "alcohol_drinker",
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
