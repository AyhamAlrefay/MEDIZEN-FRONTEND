import { useAppointmentsService } from "@/services/appointments/appointments.service";
import { useDialog } from "@/shared/hooks/useDialog";
import { enqueueSnackbar } from "notistack";
import ToggleConfirmationDialog from "../../../shared/components/ToggleConfirmationDialog";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Button, Tooltip } from "@mui/material";

const CancelToggle = ({
  isCanceled,
  id,
  onSuccess,
}: {
  isCanceled: boolean;
  id: any;
  onSuccess: any;
}) => {
  const { openDialog, handleOpenDialog, handleCloseDialog } = useDialog();

  const { mutate, isPending } = useAppointmentsService()
    .cancelToggle()
    .useMutation(id, {
      onSuccess(res) {
        if (res.data.status) {
          handleCloseDialog();
          onSuccess();
        } else {
          enqueueSnackbar({
            message: "toggle cancel failed",
            variant: "error",
          });
        }
      },
    });

  const handleChangeStateClick = () => {
    mutate({});
  };
  return (
    <>
      <Tooltip title={isCanceled ? "Already canceled" : "Cancel appointment"}>
        <span>
          <Button
            onClick={handleOpenDialog}
            disabled={isCanceled}
            variant="contained"
            color={isCanceled ? "error" : "warning"}
            startIcon={
              isCanceled ? <HighlightOffIcon /> : <CancelOutlinedIcon />
            }
            sx={{
              textTransform: "none",
              borderRadius: 2,
              pointerEvents: isCanceled ? "none" : "auto",
              opacity: isCanceled ? 0.7 : 1,
            }}
          >
            {isCanceled ? "Canceled" : "Cancel"}
          </Button>
        </span>
      </Tooltip>
      <ToggleConfirmationDialog
        open={openDialog}
        description={`Are you sure you want to mark this appointment as ${
          !isCanceled ? "Canceled" : "Uncancel"
        }`}
        title="Change appointment status!"
        onClose={handleCloseDialog}
        onSubmit={handleChangeStateClick}
        loading={isPending}
      />
    </>
  );
};

export default CancelToggle;
