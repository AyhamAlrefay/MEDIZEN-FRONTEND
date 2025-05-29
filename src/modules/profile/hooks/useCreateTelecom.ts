import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { useTelecomService } from "@/services/telecoms/telecom.service";
import { useDialog } from "@/shared/hooks/useDialog";
import {
  Form,
  useFormSchema,
} from "../component/TelecomsIndex/TelecomForm/validation";
import { serializer } from "../component/TelecomsIndex/TelecomForm/serializer";

export const useCreateTelecom = () => {
  const { handleCloseDialog, handleOpenDialog, openDialog } = useDialog();
  const invalidate = useTelecomService().index().invalidate;
  const { formSchema } = useFormSchema();
  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
  });

  const { mutate, isPending: mutateLoading } = useTelecomService()
    .create()
    .useMutation({
      onSuccess: (res) => {
        if (res.data.status) {
          methods.reset();
          enqueueSnackbar({
            message: "Telecom added successful",
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
