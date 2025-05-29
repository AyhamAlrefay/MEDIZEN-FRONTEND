import { type ReactNode } from "react";
import { Stack, type StackProps } from "@mui/material";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { type Form, type useFormSchema } from "./validation";
import ControlledRangeField from "../QualifiedValuesFields/ControlledRangeField";
import GenderControlledField from "@/shared/components/common/GenderControlledField";
export interface QualifiedValuesFormProps extends StackProps<"form"> {
  actionsComponent?: ReactNode;
  methods: UseFormReturn<Form>;
  formSchema: ReturnType<typeof useFormSchema>["formSchema"];
}

export const QualifiedValuesForm = (props: QualifiedValuesFormProps) => {
  const { methods, formSchema, actionsComponent } = props;
  const { control } = methods;
  console.log(methods.watch("age_range"));

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        mt={3}
        {...props}
        sx={{ marginX: "auto" }}
        width="90%"
      >
        <Stack direction="row" flexWrap="wrap" columnGap={2}>
          <Stack flex={10}>
            <Stack
              display="grid"
              columnGap={6}
              rowGap={3}
              sx={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
            >
              <ControlledRangeField
                controllerProps={{
                  control,
                  name: "age_range",
                  schema: formSchema,
                }}
              />
              <ControlledRangeField
                controllerProps={{
                  control,
                  name: "value_range",
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
              {/* <GenderControlledField
                controllerProps={{
                  control,
                  name: "context",
                  schema: formSchema,
                }}
              /> */}
              {/* <GenderControlledField
                controllerProps={{
                  control,
                  name: "applies_to",
                  schema: formSchema,
                }}
              /> */}
              {/* <GenderControlledField
                controllerProps={{
                  control,
                  name: "range_category",
                  schema: formSchema,
                }}
              /> */}
            </Stack>
          </Stack>
        </Stack>
        {actionsComponent}
      </Stack>
    </FormProvider>
  );
};
