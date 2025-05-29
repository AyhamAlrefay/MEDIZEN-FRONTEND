import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { useRolesService } from "@/services/roles/roles.service";
import { useDialog } from "@/shared/hooks/useDialog";
import {
  Form,
  useFormSchema,
} from "../components/RolesIndex/RoleForm/validation";
import { serializer } from "../components/RolesIndex/RoleForm/serializer";

export const useCreateRole = () => {
  const { handleCloseDialog, handleOpenDialog, openDialog } = useDialog();
  const invalidate = useRolesService().index().invalidate;
  const { formSchema } = useFormSchema();
  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
  });

  const { mutate, isPending: mutateLoading } = useRolesService()
    .create()
    .useMutation({
      onSuccess: (res) => {
        if (res.data.status) {
          methods.reset();
          enqueueSnackbar({
            message: "Role added successfully",
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
    formSchema,
    isLoading,
    methods,
    onSubmit,
    handleCloseDialog,
    handleOpenDialog,
    openDialog,
  };
};
