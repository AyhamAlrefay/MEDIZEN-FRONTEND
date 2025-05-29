import { Stack } from "@mui/material";
import PageHeader from "@/shared/components/PageHeader";
import HealthCareEligibiltyTable from "../Components/HealthCareEligibiltyIndex/HealthCareEligibiltyTable";
import CreateDialog from "../Components/HealthCareEligibiltyIndex/HealthCareEligibiltyCreateDialog";
import { Can } from "@/can/Can";
import { Actions, Subjects, SubjectToActions } from "@/can/permissions";
const HealthCareEligibiltyIndex = () => {
  return (
    <Stack sx={{ p: "28px 26px", bgcolor: "white", borderRadius: 6 }}>
      <PageHeader
        title="Health Care Services"
        action={
          <Can
            action={
              SubjectToActions[Subjects.HEALTHCARE_SERVICE_MANAGEMENT][
                Actions.CREATE_HEALTH_CARE_SERVICE_ELIGIBILITY
              ]
            }
          >
            <CreateDialog />
          </Can>
        }
      />
      <HealthCareEligibiltyTable />
    </Stack>
  );
};

export default HealthCareEligibiltyIndex;
