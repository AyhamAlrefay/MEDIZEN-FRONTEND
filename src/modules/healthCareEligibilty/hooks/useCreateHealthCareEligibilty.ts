import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { useDialog } from "@/shared/hooks/useDialog";
import { serializer } from "../Components/HealthCareEligibiltyIndex/HealthCareEligibiltyForm/serializer";

import {
  Form,
  useFormSchema,
} from "../Components/HealthCareEligibiltyIndex/HealthCareEligibiltyForm/validation";
import { useHealthCareEligibiltyService } from "@/services/healthCareEligibilty/healthCareEligibilty.service";
export const useCreateHealthCareEligibilty = () => {
  const { handleCloseDialog, handleOpenDialog, openDialog } = useDialog();
  const invalidate = useHealthCareEligibiltyService().index().invalidate;
  useHealthCareEligibiltyService().index().invalidate;
  const { formSchema } = useFormSchema();
  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
  });

  const { mutate, isPending: mutateLoading } = useHealthCareEligibiltyService()
    .create()
    .useMutation({
      onSuccess: (res) => {
        if (res.data.status) {
          enqueueSnackbar({
            message: "Health Care Eligibilty added successful",
            variant: "success",
          });
          invalidate();
          handleCloseDialog();
          methods.reset();
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

    handleCloseDialog,
    handleOpenDialog,
    openDialog,
  };
};
