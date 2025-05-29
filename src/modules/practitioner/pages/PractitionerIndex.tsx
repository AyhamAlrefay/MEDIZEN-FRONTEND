import { Button, Stack } from "@mui/material";
import PractitionerTable from "../components/PractitionerIndex/PractitionerTable";
import PageHeader from "@/shared/components/PageHeader";
import { useNavigate } from "react-router-dom";
import { PagesRoutes } from "@/constants";

const PractitionerShow = () => {
  const navigate = useNavigate();
  const handleNavigateToCreatePractitioner = () => {
    navigate(PagesRoutes.practitioner.children.create.path);
  };
  return (
    <Stack sx={{ p: "28px 26px", bgcolor: "white", borderRadius: 6 }}>
      <PageHeader
        title="Practitioners"
        action={
          <Button
            sx={{ px: 4, py: 1 }}
            variant="contained"
            onClick={handleNavigateToCreatePractitioner}
          >
            Add Practitioner
          </Button>
        }
      />
      <PractitionerTable />
    </Stack>
  );
};

export default PractitionerShow;
