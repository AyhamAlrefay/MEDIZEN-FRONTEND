import { Stack, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useRolesService } from "@/services/roles/roles.service";
import PageHeader from "@/shared/components/PageHeader";
import { PageLoader } from "@/shared/components/PageLoader";
import RolePermissionsForm from "../components/RolePermissions/RolePermissionsForm";

const RolePermissions = () => {
  const { id } = useParams();
  const { data: roleData, isLoading: isRoleLoading } = useRolesService()
    .getRolePermissions()
    .useQuery(Number(id));

  const { data: permissionsGroupsData, isLoading: isPermissionsLoading } =
    useRolesService().getAllPermissions().useQuery();

  const role = roleData?.data?.role;

  if (isRoleLoading || isPermissionsLoading) return <PageLoader />;
  return (
    <Stack sx={{ p: "28px 26px", bgcolor: "white", borderRadius: 6 }}>
      <PageHeader title={`${role?.name} permissions`} />
      <Box sx={{ mt: 2 }}>
        <RolePermissionsForm
          role={role!}
          permissionsGroups={permissionsGroupsData?.data.groups_with_permissions ?? []}
        />
      </Box>
    </Stack>
  );
};

export default RolePermissions;
