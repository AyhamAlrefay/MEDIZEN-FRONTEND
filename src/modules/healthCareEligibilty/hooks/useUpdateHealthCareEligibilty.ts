import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { useDialog } from "@/shared/hooks/useDialog";
import { useHealthCareEligibiltyService } from "@/services/healthCareEligibilty/healthCareEligibilty.service";
import {
  deserializer,
  serializer,
} from "../Components/HealthCareEligibiltyIndex/HealthCareEligibiltyForm/serializer";
import { HealthCareEligibilty } from "@/services/healthCareEligibilty/healthCareEligibilty.types";
import {
  Form,
  useFormSchema,
} from "../Components/HealthCareEligibiltyIndex/HealthCareEligibiltyForm/validation";

export const useUpdateHealthCareEligibilty = ({
  healthCareEligibilty,
}: {
  healthCareEligibilty: HealthCareEligibilty;
}) => {
  const { handleCloseDialog, handleOpenDialog, openDialog } = useDialog();

  const { formSchema } = useFormSchema();
  const invalidate = useHealthCareEligibiltyService().index().invalidate;
  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
    defaultValues: deserializer(healthCareEligibilty),
  });

  const { mutate, isPending: mutateLoading } = useHealthCareEligibiltyService()
    .update()
    .useMutation(healthCareEligibilty?.id, {
      onSuccess: (res) => {
        if (res.data.status) {
          enqueueSnackbar({
            message: "Health Care Eligibilty edited successful",
            variant: "success",
          });
          invalidate();
          handleCloseDialog();
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
