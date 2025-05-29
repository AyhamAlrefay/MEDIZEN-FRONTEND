import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationDialog from "@/shared/components/DeleteConfirmationDialog";
import { useDialog } from "@/shared/hooks/useDialog";
import { HealthCareEligibilty } from "@/services/healthCareEligibilty/healthCareEligibilty.types";
import { useHealthCareEligibiltyService } from "@/services/healthCareEligibilty/healthCareEligibilty.service";
import { enqueueSnackbar } from "notistack";

interface DeleteDialogProps {
  healthCareEligibilty: HealthCareEligibilty;
}

function HealthCareEligibiltyDeleteDialog({
  healthCareEligibilty,
}: DeleteDialogProps) {
  const { openDialog, handleOpenDialog, handleCloseDialog } = useDialog();
  const invalidate = useHealthCareEligibiltyService().index().invalidate;

  const { mutate, isPending } = useHealthCareEligibiltyService()
    .delete()
    .useMutation(healthCareEligibilty.id!, {
      onSuccess: (res) => {
        if (res.data.status) {
          handleCloseDialog();
          invalidate();
          enqueueSnackbar({
            message: "Health Care Eligibilty deleted successfully",
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
        description={`Are you sure you want to delete Health Care Eligibilty ?`}
        title="Delete Health Care Eligibilty"
        onClose={handleCloseDialog}
        onSubmit={handleDeleteClick}
        loading={isPending}
      />
    </>
  );
}

export default HealthCareEligibiltyDeleteDialog;
