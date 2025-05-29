import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationDialog from "@/shared/components/DeleteConfirmationDialog";
import { useDialog } from "@/shared/hooks/useDialog";
import { enqueueSnackbar } from "notistack";
import { QualifiedValues } from "@/services/qualifiedValues/qualifiedValues.types";
import { useQualifiedValuesService } from "@/services/qualifiedValues/qualifiedValues.service";

interface DeleteDialogProps {
  qualifiedValues: QualifiedValues;
}

function QualifiedValuesDeleteDialog({ qualifiedValues }: DeleteDialogProps) {
  const { openDialog, handleOpenDialog, handleCloseDialog } = useDialog();
  const invalidate = useQualifiedValuesService().index().invalidate;

  const { mutate, isPending } = useQualifiedValuesService()
    .delete()
    .useMutation(qualifiedValues.id!, {
      onSuccess: (res) => {
        if (res.data.status) {
          handleCloseDialog();
          invalidate();
          enqueueSnackbar({
            message: "Qualified values deleted successfully",
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
        description={`Are you sure you want to delete Qualified Values ?`}
        title="Delete Qualified Values"
        onClose={handleCloseDialog}
        onSubmit={handleDeleteClick}
        loading={isPending}
      />
    </>
  );
}

export default QualifiedValuesDeleteDialog;
