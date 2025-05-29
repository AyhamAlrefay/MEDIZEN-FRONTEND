import { usePatientService } from "@/services/patients/patients.service";
import { Patient } from "@/services/patients/patients.types";
import { PageLoader } from "@/shared/components/PageLoader";
import { useParams } from "react-router-dom";
import PatientUpdateIndex from "../components/PatientUpdate/PatientUpdateIndex";
function PatientUpdate() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = usePatientService()
    .indexOne()
    .useQuery(Number(id));

  const patient: Patient | undefined = data?.data?.Patient_profile;

  if (isLoading) return <PageLoader />;
  if (patient) return <PatientUpdateIndex patient={patient} />;
  return null;
}

export default PatientUpdate;
