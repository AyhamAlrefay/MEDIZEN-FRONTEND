import { Stack } from "@mui/material";
import PageHeader from "@/shared/components/PageHeader";
import PatientsTable from "../components/PatientsIndex/PatientsTable";
const PatientsIndex = () => {
  return (
    <Stack sx={{ p: "28px 26px", bgcolor: "white", borderRadius: 6 }}>
      <PageHeader title="Patients" action={<></>} />
      <PatientsTable />
    </Stack>
  );
};

export default PatientsIndex;
