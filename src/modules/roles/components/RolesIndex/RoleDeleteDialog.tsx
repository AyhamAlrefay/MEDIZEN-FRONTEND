import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationDialog from "@/shared/components/DeleteConfirmationDialog";
import { useDialog } from "@/shared/hooks/useDialog";
import { Role } from "@/services/roles/roles.types";
import { useRolesService } from "@/services/roles/roles.service";
import { enqueueSnackbar } from "notistack";

interface RoleDeleteDialogProps {
  role: Role;
}

function RoleDeleteDialog({ role }: RoleDeleteDialogProps) {
  const { openDialog, handleOpenDialog, handleCloseDialog } = useDialog();
  const invalidate = useRolesService().index().invalidate;

  const { mutate, isPending } = useRolesService()
    .delete()
    .useMutation(role.id!, {
      onSuccess: (res) => {
        if (res.data.status) {
          handleCloseDialog();
          invalidate();
          enqueueSnackbar({
            message: "Role deleted successfully",
            variant: "success",
          });
        } else {
          enqueueSnackbar({
            message: "Delete failed",
            variant: "error",
          });
        }
      },
    });

  const handleDeleteClick = () => {
    mutate({});
  };

  return (
    <>
      <IconButton color="error" onClick={handleOpenDialog}>
        <DeleteIcon />
      </IconButton>
      <DeleteConfirmationDialog
        open={openDialog}
        description={`Are you sure you want to delete role ${role.name}?`}
        title="Delete Role"
        onClose={handleCloseDialog}
        onSubmit={handleDeleteClick}
        loading={isPending}
      />
    </>
  );
}

export default RoleDeleteDialog; 