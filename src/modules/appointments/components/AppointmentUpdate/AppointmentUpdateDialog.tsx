import { Button, IconButton, Stack } from "@mui/material";
import { AppointmentsForm } from "./UpdateForm/Form";
import { StyledDialog } from "@/shared/components/Dialog/Dialog";
import { useUpdateAppointment } from "../../hooks/useUpdateAppointment";
import { Appointments } from "@/services/appointments/appointments.types";
import EditIcon from "@mui/icons-material/Edit";

function AppointmentUpdateDialog({
  appointment,
  onSuccess,
}: {
  appointment: Appointments;
  onSuccess: any;
}) {
  const {
    formSchema,
    isLoading,
    methods,
    onSubmit,
    handleCloseDialog,
    handleOpenDialog,
    openDialog,
  } = useUpdateAppointment({
    appointment,
    onSuccess,
  });
  return (
    <>
      <IconButton color="primary" onClick={() => handleOpenDialog()}>
        <EditIcon />
      </IconButton>
      <StyledDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={"Edit Appointment"}
      >
        <AppointmentsForm
          formSchema={formSchema}
          methods={methods}
          onSubmit={onSubmit}
          actionsComponent={
            <Stack
              direction="row"
              sx={{
                justifyContent: "flex-end",
                mt: "5rem",
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

export default AppointmentUpdateDialog;
