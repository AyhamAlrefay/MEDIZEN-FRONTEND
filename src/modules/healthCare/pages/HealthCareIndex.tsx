import { Button, Stack } from "@mui/material";
import PageHeader from "@/shared/components/PageHeader";
import { useNavigate } from "react-router-dom";
import { PagesRoutes } from "@/constants";
import HealthCareTable from "../Components/HealthCareIndex/HealthCareTable";
import { Can } from "@/can/Can";
import { Actions, Subjects, SubjectToActions } from "@/can/permissions";
const HealthCareIndex = () => {
  const navigate = useNavigate();
  const handleNavigateToCreateHealthCare = () => {
    navigate(PagesRoutes.healthCare.children.create.path);
  };
  return (
    <Stack sx={{ p: "28px 26px", bgcolor: "white", borderRadius: 6 }}>
      <PageHeader
        title="Health Care Services"
        action={
          <Can
            action={
              SubjectToActions[Subjects.HEALTHCARE_SERVICE_MANAGEMENT][
                Actions.CREATE_HEALTH_CARE_SERVICE
              ]
            }
          >
            <Button
              sx={{ px: 4, py: 1 }}
              variant="contained"
              onClick={handleNavigateToCreateHealthCare}
            >
              Add Health Care Service
            </Button>
          </Can>
        }
      />
      <HealthCareTable />
    </Stack>
  );
};

export default HealthCareIndex;
