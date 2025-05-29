import { useTelecomService } from "@/services/telecoms/telecom.service";
import DeleteConfirmationDialog from "@/shared/components/DeleteConfirmationDialog";
import { useDialog } from "@/shared/hooks/useDialog";
import { IconButton } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Telecom } from "@/services/telecoms/telecom.types";
interface Props {
  telecom: Telecom;
}
const DeleteTelecomDialog = ({ telecom }: Props) => {
  const { openDialog, handleOpenDialog, handleCloseDialog } = useDialog();
  const invalidate = useTelecomService().index().invalidate;

  const { mutate, isPending } = useTelecomService()
    .delete()
    .useMutation(telecom.id, {
      onSuccess(res) {
        if (res.data.status) {
          handleCloseDialog();
          invalidate();
        } else {
          enqueueSnackbar({
            message: "delete failed",
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
        description={`Are you sure you want to delete telecom ${telecom.value} ?`}
        title="Delete Telecom!"
        onClose={handleCloseDialog}
        onSubmit={handleDeleteClick}
        loading={isPending}
      />
    </>
  );
};

export default DeleteTelecomDialog;
