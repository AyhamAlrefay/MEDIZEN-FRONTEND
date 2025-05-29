import Page500 from "@/modules/status/pages/Page500";
import { useUserService } from "@/services/user/user.service";
import { PageLoader } from "@/shared/components/PageLoader";
import { Button, Stack, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { ProfileForm } from "../component/ProfileUpdate/ProfileForm";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const { isLoading, formSchema, methods, onSubmit } = useUpdateProfile();

  return (
    <Stack sx={{ bgcolor: "white", borderRadius: 6, p: "28px 26px" }}>
      <Stack direction="row" justifyContent="space-between" mb="1rem">
        <Typography variant="h6" color="primary">
          Profile
        </Typography>
        {/* <ChangePassword /> */}
      </Stack>

      <ProfileForm
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

const _ProfileUpdate = () => {
  const { data, isFetching, error } = useUserService().showMe().useQuery();

  if (isFetching) return <PageLoader />;

  if (error) return <Page500 />;

  if (data) return <ProfileUpdate />;
};
export default _ProfileUpdate;
