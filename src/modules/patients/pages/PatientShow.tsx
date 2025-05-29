import { Stack } from "@mui/material";
import { PatientCard } from "../components/PatientShow/PatientCard";
import { PageLoader } from "@/shared/components/PageLoader";
import { usePatientService } from "@/services/patients/patients.service";
import { useParams } from "react-router-dom";

const PractitionerShow = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = usePatientService()
    .indexOne()
    .useQuery(Number(id));

  if (isLoading) return <PageLoader />;
  return (
    <Stack>
      <PatientCard data={data?.data?.Patient_profile} />
    </Stack>
  );
};

export default PractitionerShow;
