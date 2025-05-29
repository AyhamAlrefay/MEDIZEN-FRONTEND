import { useCreateAppointment } from "@/modules/appointments/hooks/useCreateAppointent";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppointmentForm } from "../components/AppointmentCreate/CreateForm/Form";

function AppointmentsCreate() {
  const { formSchema, isLoading, methods, onSubmit } = useCreateAppointment();
  return (
    <Stack sx={{ bgcolor: "white", borderRadius: 6, p: "28px 26px" }}>
      <Stack mb="1rem">
        <Typography variant="h6" color="primary">
          Add Appointment
        </Typography>
        <AppointmentForm
          formSchema={formSchema}
          methods={methods}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </Stack>
    </Stack>
  );
}

export default AppointmentsCreate;
