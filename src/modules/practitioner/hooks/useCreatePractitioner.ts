import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import {
  Form,
  useFormSchema,
} from "../components/PractitionerCreate/PractitionerForm/validation";
import { serializer } from "../components/PractitionerCreate/PractitionerForm/serializer";
import { usePractitionerService } from "@/services/practitioner/practitioner.service";
import { useState } from "react";
import { useDialog } from "@/shared/hooks/useDialog";

export const useCreatePractitioner = () => {
  const { handleOpenDialog, handleCloseDialog, openDialog } = useDialog();
  const invalidate = usePractitionerService().index().invalidate;
  const { formSchema } = useFormSchema();
  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
  });

  const { mutate, isPending: mutateLoading } = usePractitionerService()
    .create()
    .useMutation({
      onSuccess: (res) => {
        if (res.data.status) {
          enqueueSnackbar({
            message: "Practitioner added successful",
            variant: "success",
          });
          invalidate();
          handleOpenDialog();
        }
      },
    });

  const isLoading = mutateLoading;

  const onSubmit = methods.handleSubmit(async (input: Form) => {
    mutate(serializer(input));
  });
  return {
    /**
     * **Description:** methods of react-hooks-from
     */
    methods,
    /**
     * **Description:** submit function
     */
    onSubmit,
    /**
     * **Description:** validations of my schema
     */
    formSchema,
    /**
     * **Description:** loading for update mutations
     */
    isLoading,
    /**
     * **Description:** open dialog
     */
    openDialog,
    /**
     * **Description:** handle close dialog
     */
    handleCloseDialog,
  };
};
