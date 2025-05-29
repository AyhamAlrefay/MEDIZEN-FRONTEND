import Page500 from "@/modules/status/pages/Page500";
import { useHealthCareService } from "@/services/healthCare/healthCare.service";
import { HealthCare } from "@/services/healthCare/healthCare.types";
import { PageLoader } from "@/shared/components/PageLoader";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { HealthCareForm } from "../Components/HealthCareForm/HealthCareForm";
import { useUpdateHealthCare } from "../hooks/useUpdateHealthCare";

const HealthCareUpdate = ({ healthCare }: { healthCare: HealthCare }) => {
  const navigate = useNavigate();
  const { isLoading, formSchema, methods, onSubmit } = useUpdateHealthCare({
    healthCare,
  });

  return (
    <Stack sx={{ bgcolor: "white", borderRadius: 6, p: "28px 26px" }}>
      <Stack direction="row" justifyContent="space-between" mb="1rem">
        <Typography variant="h6" color="primary">
          Edit Health Care Service
        </Typography>
      </Stack>
      <HealthCareForm
        formSchema={formSchema}
        methods={methods}
        onSubmit={onSubmit}
        actionsComponent={
          <Stack
            direction="row"
            sx={{
              justifyContent: "flex-end",
              mt: "5rem",
              columnGap: "1.75rem",
            }}
          >
            <Button
              type="button"
              onClick={() => navigate(-1)}
              sx={{ paddingX: 7, paddingY: 1 }}
              variant="outlined"
            >
              cancel
            </Button>
            <Button
              type="submit"
              sx={{ paddingX: 7, paddingY: 1 }}
              variant="contained"
              disabled={isLoading}
            >
              save
            </Button>
          </Stack>
        }
      />
    </Stack>
  );
};

const _HealthCareUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useHealthCareService()
    .indexOne()
    .useQuery(Number(id));
  if (isLoading) return <PageLoader />;
  if (data)
    return <HealthCareUpdate healthCare={data?.data?.healthCareService} />;

  return null;
};
export default _HealthCareUpdate;
