import { type ReactNode } from "react";
import { Stack, type StackProps } from "@mui/material";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { type Form, type useFormSchema } from "./validation";
import { ControlledTextField } from "@/shared/components/controlled/ControlledTextField";
import { ControlledDateField } from "@/shared/components/controlled/ControlledDateField";
import dayjs from "dayjs";
import TelecomTypesControlledField from "../TelecomFields/TelecomeTypeControlledField";
import TelecomUseControlledField from "../TelecomFields/TelecomeUseControlledField";

export interface TelecomFormProps extends StackProps<"form"> {
  actionsComponent?: ReactNode;
  methods: UseFormReturn<Form>;
  formSchema: ReturnType<typeof useFormSchema>["formSchema"];
}

export const TelecomForm = (props: TelecomFormProps) => {
  const { methods, formSchema, actionsComponent } = props;
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <Stack component="form" {...props}>
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
                  name: "value",
                  schema: formSchema,
                }}
              />
              <ControlledTextField
                controllerProps={{
                  control,
                  name: "rank",
                  schema: formSchema,
                }}
              />
              <ControlledDateField
                controllerProps={{
                  control,
                  name: "start_date",
                  schema: formSchema,
                }}
                maxDate={dayjs()}
              />
              <ControlledDateField
                controllerProps={{
                  control,
                  name: "end_date",
                  schema: formSchema,
                }}
              />
              <TelecomTypesControlledField
                controllerProps={{
                  control,
                  name: "type",
                  schema: formSchema,
                }}
              />
              <TelecomUseControlledField
                controllerProps={{
                  control,
                  name: "use",
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
