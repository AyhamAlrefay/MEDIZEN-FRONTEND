import { StyledDialog } from "./Dialog";
import { Button, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export function DeleteDialog({
  openDialog,
  handleCloseDialog,
  onDelete,
  title,
  desc,
  loading = false,
}: {
  openDialog: boolean;
  handleCloseDialog: () => void;
  onDelete: () => void;
  title: string;
  desc?: string;
  loading?: boolean;
}) {
  return (
    <StyledDialog
      open={openDialog}
      onClose={handleCloseDialog}
      title={title}
      dialogactions={
        <>
          <Button
            type="button"
            sx={{ px: 4, py: 1 }}
            variant="outlined"
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            color="error"
            sx={{ px: 4, py: 1 }}
            variant="contained"
            onClick={onDelete}
            loading={loading}
          >
            Delete
          </LoadingButton>
        </>
      }
    >
      {desc ? (
        desc
      ) : (
        <Typography color="black" variant="body1">
          Are you sure you want to delete this ?
        </Typography>
      )}
    </StyledDialog>
  );
}
