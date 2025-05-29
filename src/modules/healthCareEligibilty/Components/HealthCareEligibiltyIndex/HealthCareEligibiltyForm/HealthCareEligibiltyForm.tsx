import { type ReactNode } from "react";
import { Stack, type StackProps } from "@mui/material";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { type Form, type useFormSchema } from "./validation";
import { ControlledTextField } from "@/shared/components/controlled/ControlledTextField";
import EligibilityTypeControlledField from "@/shared/components/common/EligibilityControlledField";
import HealthCareServiceControlledField from "@/shared/components/common/healthCareServiceControlledField";
export interface HealthCareEligibiltyFormProps extends StackProps<"form"> {
  actionsComponent?: ReactNode;
  methods: UseFormReturn<Form>;
  formSchema: ReturnType<typeof useFormSchema>["formSchema"];
}
export const HealthCareEligibiltyForm = (
  props: HealthCareEligibiltyFormProps,
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
            <ControlledTextField
              controllerProps={{
                control,
                name: "comment",
                schema: formSchema,
              }}
            />
            <EligibilityTypeControlledField
              controllerProps={{
                control,
                name: "eligibility",
                schema: formSchema,
              }}
            />
            <HealthCareServiceControlledField
              controllerProps={{
                control,
                name: "health_care_service",
                schema: formSchema,
              }}
            />
          </Stack>
        </Stack>
        {actionsComponent}
      </Stack>
    </FormProvider>
  );
};
