import { useShowMyAppointmentService } from "@/services/showMyAppointment/showMyAppointment.service";
import { PageLoader } from "@/shared/components/PageLoader";
import { Stack, Typography } from "@mui/material";
import MyAppointment from "../components/ShowMyAppointmentsIndex/MyAppointment";
const ShowMyAppointmentsIndex = () => {
  const { data, isLoading } = useShowMyAppointmentService().index().useQuery();
  const myAppointments = data?.data?.appointments.data;

  if (isLoading) return <PageLoader />;
  return (
    <Stack sx={{ px: "26px", borderRadius: 6 }}>
      {myAppointments && <MyAppointment appointments={myAppointments} />}
    </Stack>
  );
};

export default ShowMyAppointmentsIndex;
