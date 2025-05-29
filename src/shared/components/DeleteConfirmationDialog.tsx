import { Button, Typography } from "@mui/material";
import { StyledDialog } from "./Dialog/Dialog";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  description: string;
  loading: boolean;
}
function DeleteConfirmationDialog({
  description,
  onClose,
  onSubmit,
  open,
  title,
  loading,
}: DeleteConfirmationDialogProps) {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      title={title}
      dialogactions={
        <>
          <Button
            type="button"
            sx={{ px: 4, py: 1 }}
            variant="outlined"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            type="submit"
            color="error"
            sx={{ px: 4, py: 1 }}
            variant="contained"
            onClick={() => {
              onSubmit();
            }}
          >
            Delete
          </Button>
        </>
      }
    >
      <Typography color="black" variant="body1">
        {description}
      </Typography>
    </StyledDialog>
  );
}

export default DeleteConfirmationDialog;
