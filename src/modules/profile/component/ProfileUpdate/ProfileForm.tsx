import { type ReactNode } from "react";
import { Stack, Typography, type StackProps } from "@mui/material";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { type Form, type useFormSchema } from "./validation";
import { ControlledTextField } from "@/shared/components/controlled/ControlledTextField";
import { ControlledDateField } from "@/shared/components/controlled/ControlledDateField";
import dayjs from "dayjs";
import { ProfileImageInput } from "./ProfileImageInput";
import GenderControlledField from "@/shared/components/common/GenderControlledField";

export interface ProfileFormProps extends StackProps<"form"> {
  actionsComponent?: ReactNode;
  methods: UseFormReturn<Form>;
  formSchema: ReturnType<typeof useFormSchema>["formSchema"];
}

export const ProfileForm = (props: ProfileFormProps) => {
  const { methods, formSchema, actionsComponent } = props;
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <Stack component="form" {...props}>
        <Stack direction="row" flexWrap="wrap" columnGap={2}>
          <Stack flex={2}>
            <ProfileImageInput />
          </Stack>
          <Stack flex={8}>
            <Typography sx={{ mb: 4 }} variant="subtitle1" color="primary">
              Personal info:
            </Typography>
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
                  control,
                  name: "text",
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
              <ControlledTextField
                controllerProps={{
                  control,
                  name: "suffix",
                  schema: formSchema,
                }}
              />
              <ControlledTextField
                controllerProps={{
                  control,
                  name: "address",
                  schema: formSchema,
                }}
              />
              <ControlledDateField
                controllerProps={{
                  control,
                  name: "date_of_birth",
                  schema: formSchema,
                }}
                maxDate={dayjs()}
              />
              <GenderControlledField
                controllerProps={{
                  control,
                  name: "gender",
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
