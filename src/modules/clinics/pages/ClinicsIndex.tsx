import { Stack } from "@mui/material";
import ClinicsTable from "../components/ClinicsIndex/ClinicsTable";
import PageHeader from "@/shared/components/PageHeader";
import ClinicCreateDialog from "../components/ClinicsIndex/ClinicCreateDialog";
import { Can } from "@/can/Can";
import { Actions, Subjects, SubjectToActions } from "@/can/permissions";

const ClinicsIndex = () => {
  return (
    <Stack sx={{ p: "28px 26px", bgcolor: "white", borderRadius: 6 }}>
      <PageHeader title="Clinics" action={
        <Can action={SubjectToActions[Subjects.CLINIC_MANAGEMENT][Actions.CREATE_CLINIC]}>
          <ClinicCreateDialog />
        </Can>
      } />
      <ClinicsTable />
    </Stack>
  );
};

export default ClinicsIndex;
