import { useState, type ReactNode } from "react";
import { Avatar, Stack, type StackProps } from "@mui/material";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { type Form, type useFormSchema } from "./validation";
import { ControlledTextField } from "@/shared/components/controlled/ControlledTextField";
import Dropzone from "@/shared/components/Dropzone/Dropzone";
import { Clinic } from "@/services/clinics/clinics.types";

export interface ClinicFormProps extends StackProps<"form"> {
  actionsComponent?: ReactNode;
  methods: UseFormReturn<Form>;
  formSchema: ReturnType<typeof useFormSchema>["formSchema"];
  clinic?: Clinic;
}

export const ClinicForm = (props: ClinicFormProps) => {
  const { methods, formSchema, actionsComponent, clinic } = props;
  const { control } = methods;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDropPhoto = (file: File) => {
    setPreviewUrl(URL.createObjectURL(file));
    methods.setValue("photo", file);
  };
  return (
    <FormProvider {...methods}>
      <Stack component="form" {...props}>
        <Stack flexWrap="wrap" gap={2}>
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
              name: "description",
              schema: formSchema,
            }}
          />

          <Dropzone onDropFile={handleDropPhoto} />
          {(previewUrl || clinic?.photo) && (
            <Avatar
              src={previewUrl ?? clinic?.photo}
              alt="Clinic Preview"
              sx={{ width: 64, height: 64 }}
            />
          )}
        </Stack>
        {actionsComponent}
      </Stack>
    </FormProvider>
  );
};
