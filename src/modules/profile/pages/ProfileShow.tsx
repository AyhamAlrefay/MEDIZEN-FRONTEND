import { Stack } from "@mui/material";

import { useUserService } from "@/services/user/user.service";
import { ProfileCard } from "../component/ProfileShow/ProfileCard";
import { PageLoader } from "@/shared/components/PageLoader";

const ProfileShow = () => {
  const { data, isLoading } = useUserService().showMe().useQuery();
  const Me = data?.data?.profile;

  if (isLoading) return <PageLoader />;
  return (
    <Stack>
      <ProfileCard me={Me} />
    </Stack>
  );
};

export default ProfileShow;
