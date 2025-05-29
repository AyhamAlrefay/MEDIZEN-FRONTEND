import { type ReactNode } from "react";
import { Stack, type StackProps } from "@mui/material";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { type Form, type useFormSchema } from "./validation";
import { ControlledTextField } from "@/shared/components/controlled/ControlledTextField";
import { ControlledDateField } from "@/shared/components/controlled/ControlledDateField";
import PractitionerTypesControlledField from "../PractitionerFields/PractitionerTypeControlledField";
import ClinicControlledField from "@/shared/components/common/ClinicControlledField";
import RolesControlledField from "@/shared/components/common/RolesControlledField";

export interface PractitionerFormProps extends StackProps<"form"> {
  actionsComponent?: ReactNode;
  methods: UseFormReturn<Form>;
  formSchema: ReturnType<typeof useFormSchema>["formSchema"];
}

export const PractitionerForm = (props: PractitionerFormProps) => {
  const { methods, formSchema, actionsComponent } = props;
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        mt={5}
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
                  name: "f_name",
                  schema: formSchema,
                }}
              />
              <ControlledTextField
                controllerProps={{
                  control,
                  name: "l_name",
                  schema: formSchema,
                }}
              />
              <ControlledTextField
                controllerProps={{
                  name: "email",
                  schema: formSchema,
                }}
              />
              <ControlledTextField
                type={"password"}
                controllerProps={{
                  name: "password",
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
              <PractitionerTypesControlledField
                controllerProps={{
                  control,
                  name: "gender",
                  schema: formSchema,
                }}
              />
              <RolesControlledField
                controllerProps={{
                  control,
                  name: "role",
                  schema: formSchema,
                }}
              />
              <ClinicControlledField
                controllerProps={{
                  control,
                  name: "clinic",
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
