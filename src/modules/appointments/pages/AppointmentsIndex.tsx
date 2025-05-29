import { Button, Stack } from "@mui/material";
import PageHeader from "@/shared/components/PageHeader";
import AppointmentsTable from "../components/AppointmentsIndex/AppointmentsTable";
import { PagesRoutes } from "@/constants";
import { useNavigate } from "react-router-dom";
import { Can } from "@/can/Can";
import { Actions, Subjects, SubjectToActions } from "@/can/permissions";

const AppointmentsIndex = () => {
  const navigate = useNavigate();
  const handleNavigateToCreateAppointment = () => {
    navigate(PagesRoutes.appointments.children.create.path);
  };
  return (
    <Stack sx={{ p: "28px 26px", bgcolor: "white", borderRadius: 6 }}>
      <PageHeader
        title="Appointments"
        action={
          <Can
            action={
              SubjectToActions[Subjects.APPOINTMENT_MANAGEMENT][
                Actions.CREATE_APPOINTMENT
              ]
            }
          >
            <Button
              sx={{ px: 4, py: 1 }}
              variant="contained"
              onClick={handleNavigateToCreateAppointment}
            >
              Add Appointment
            </Button>
          </Can>
        }
      />
      <AppointmentsTable />
    </Stack>
  );
};

export default AppointmentsIndex;
