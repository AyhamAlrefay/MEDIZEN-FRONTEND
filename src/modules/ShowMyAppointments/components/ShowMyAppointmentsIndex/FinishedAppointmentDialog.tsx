import { Button, Stack } from "@mui/material";
import { FinishedAppointmentForm } from "./FinishedForm/FinishedAppointmentForm";
import { StyledDialog } from "@/shared/components/Dialog/Dialog";
import { useFinishedAppointment } from "@/modules/ShowMyAppointments/Hooks/useFinishedAppointment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function FinishedAppointmentDialog({
  id,
  disabled,
}: {
  id: number;
  disabled: boolean;
}) {
  const {
    formSchema,
    isLoading,
    methods,
    onSubmit,
    handleCloseDialog,
    handleOpenDialog,
    openDialog,
  } = useFinishedAppointment({ id });

  return (
    <>
      <Button
        disabled={disabled}
        fullWidth
        startIcon={<CheckCircleOutlineIcon />}
        size="small"
        variant="contained"
        color={"primary"}
        onClick={handleOpenDialog}
      >
        Finished
      </Button>
      <StyledDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={"Finished Appointment"}
      >
        <FinishedAppointmentForm
          formSchema={formSchema}
          methods={methods}
          onSubmit={onSubmit}
          actionsComponent={
            <Stack
              direction="row"
              sx={{
                justifyContent: "flex-end",
                mt: 2,
                columnGap: "1.75rem",
              }}
            >
              <Button
                type="button"
                sx={{ paddingX: 7, paddingY: 1 }}
                variant="outlined"
                onClick={handleCloseDialog}
              >
                cancel
              </Button>
              <Button
                type="submit"
                sx={{ paddingX: 7, paddingY: 1 }}
                variant="contained"
                disabled={isLoading}
              >
                save
              </Button>
            </Stack>
          }
        />
      </StyledDialog>
    </>
  );
}

export default FinishedAppointmentDialog;
