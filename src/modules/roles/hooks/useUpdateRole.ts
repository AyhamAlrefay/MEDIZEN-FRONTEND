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
import { Role } from "@/services/roles/roles.types";

export const useUpdateRole = (role: Role) => {
  const { handleCloseDialog, handleOpenDialog, openDialog } = useDialog();
  const invalidate = useRolesService().index().invalidate;
  const { formSchema } = useFormSchema();
  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: role.name,
    },
  });

  const { mutate, isPending: mutateLoading } = useRolesService()
    .update()
    .useMutation(role.id!, {
      onSuccess: (res) => {
        if (res.data.status) {
          enqueueSnackbar({
            message: "Role updated successfully",
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
