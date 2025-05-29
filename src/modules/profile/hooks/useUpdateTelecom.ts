import { useTelecomService } from "./../../../services/telecoms/telecom.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { useDialog } from "@/shared/hooks/useDialog";
import { Telecom } from "@/services/telecoms/telecom.types";
import {
  deserializer,
  serializer,
} from "../component/TelecomsIndex/TelecomForm/serializer";
import {
  Form,
  useFormSchema,
} from "../component/TelecomsIndex/TelecomForm/validation";

export const useUpdateTelecom = ({ telecom }: { telecom: Telecom }) => {
  const { handleCloseDialog, handleOpenDialog, openDialog } = useDialog();

  const { formSchema } = useFormSchema();
  const invalidate = useTelecomService().index().invalidate;
  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
    defaultValues: deserializer(telecom),
  });

  const { mutate, isPending: mutateLoading } = useTelecomService()
    .update()
    .useMutation(telecom.id, {
      onSuccess: (res) => {
        if (res.data.status) {
          enqueueSnackbar({
            message: "Telecom edited successful",
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
