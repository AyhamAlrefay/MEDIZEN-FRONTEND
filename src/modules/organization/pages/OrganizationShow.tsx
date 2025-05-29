import Page500 from "@/modules/status/pages/Page500";
import { PageLoader } from "@/shared/components/PageLoader";
import { Stack, Typography, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { OrganizationForm } from "../components/OrganizationShow/OrganizationForm";
import { useOrganizationService } from "@/services/organization/organization.service";
import { useUpdateOrganization } from "../hooks/useUpdateOrganization";
import { PagesRoutes } from "@/constants";

const OrganizationShow = () => {
  const navigate = useNavigate();
  const { isLoading, formSchema, methods, onSubmit } = useUpdateOrganization();

  return (
    <Stack sx={{ bgcolor: "white", borderRadius: 6, p: "28px 26px" }}>
      <Stack direction="row" justifyContent="space-between" mb="1rem">
        <Typography variant="h6" color="primary">
          Organization Settings
        </Typography>
      </Stack>

      <OrganizationForm
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
              onClick={() => navigate(PagesRoutes.home.path)}
              sx={{ paddingX: 7, paddingY: 1 }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              sx={{ paddingX: 7, paddingY: 1 }}
              variant="contained"
              disabled={isLoading}
            >
              Save
            </Button>
          </Stack>
        }
      />
    </Stack>
  );
};

const _OrganizationShow = () => {
  const { data, isFetching, error } = useOrganizationService()
    .show()
    .useQuery();

  if (isFetching) return <PageLoader />;

  if (error) return <Page500 />;

  if (data) return <OrganizationShow />;
};
export default _OrganizationShow;
