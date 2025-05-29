import { useAppointmentsService } from "@/services/appointments/appointments.service";
import { useDialog } from "@/shared/hooks/useDialog";
import { Button, Tooltip } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import ToggleConfirmationDialog from "../../../shared/components/ToggleConfirmationDialog";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const FinishToggle = ({
  isFinished,
  id,
  onSuccess,
}: {
  isFinished: boolean;
  id: any;
  onSuccess: any;
}) => {
  const { openDialog, handleOpenDialog, handleCloseDialog } = useDialog();

  const { mutate, isPending } = useAppointmentsService()
    .FinishToggle()
    .useMutation(id, {
      onSuccess(res) {
        if (res.data.status) {
          handleCloseDialog();
          onSuccess();
        } else {
          enqueueSnackbar({
            message: "toggle active failed",
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
      <Tooltip title={isFinished ? "Already finished" : "Mark as finished"}>
        <span>
          <Button
            onClick={handleOpenDialog}
            disabled={isFinished}
            variant="contained"
            color={isFinished ? "success" : "primary"}
            startIcon={
              isFinished ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />
            }
            sx={{
              textTransform: "none",
              borderRadius: 2,
              pointerEvents: isFinished ? "none" : "auto",
              opacity: isFinished ? 0.7 : 1,
            }}
          >
            {isFinished ? "Finished" : "Finish"}
          </Button>
        </span>
      </Tooltip>
      <ToggleConfirmationDialog
        open={openDialog}
        description={`Are you sure you want to mark this appointment as ${
          !isFinished ? "Finished" : "Unfinished"
        }`}
        title="Change appointment status!"
        onClose={handleCloseDialog}
        onSubmit={handleChangeStateClick}
        loading={isPending}
      />
    </>
  );
};

export default FinishToggle;
