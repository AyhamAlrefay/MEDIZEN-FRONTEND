import { Button, Typography } from "@mui/material";
import { StyledDialog } from "@/shared/components/Dialog/Dialog";

interface ToggleConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  description: string;
  loading: boolean;
}
function ToggleConfirmationDialog({
  description,
  onClose,
  onSubmit,
  open,
  title,
  loading,
}: ToggleConfirmationDialogProps) {
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
            Confirm
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

export default ToggleConfirmationDialog;
