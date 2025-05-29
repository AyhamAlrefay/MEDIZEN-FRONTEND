import { FormProvider, useForm } from "react-hook-form";
import { Stack, MenuItem } from "@mui/material";
import { ControlledTextField } from "@/shared/components/controlled/ControlledTextField";
import { Form } from "./validation";
import { GUARD_NAME_OPTIONS } from "@/services/roles/roles.types";

interface RoleFormProps {
  methods: ReturnType<typeof useForm<Form>>;
  formSchema: any;
  actionsComponent: React.ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export const RoleForm = (props: RoleFormProps) => {
  const { methods, formSchema, actionsComponent, onSubmit } = props;
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <Stack component="form" onSubmit={onSubmit}>
        <Stack flexWrap="wrap" gap={2}>
          <ControlledTextField
            controllerProps={{
              control,
              name: "name",
              schema: formSchema,
            }}
          />
        </Stack>

        {actionsComponent}
      </Stack>
    </FormProvider>
  );
}; 