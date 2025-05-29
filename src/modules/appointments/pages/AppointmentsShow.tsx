import { Stack } from "@mui/material";
import { AppointmentDetails } from "../components/AppointmentsShow/AppointmentDetails";
import { PageLoader } from "@/shared/components/PageLoader";
import { useAppointmentsService } from "@/services/appointments/appointments.service";
import { useParams } from "react-router-dom";

const AppointmentsShow = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useAppointmentsService()
    .indexOne()
    .useQuery(Number(id));

  if (isLoading) return <PageLoader />;
  if (data?.data?.appointment)
    return (
      <Stack>
        <AppointmentDetails data={data?.data?.appointment} />
      </Stack>
    );
  return null;
};

export default AppointmentsShow;
