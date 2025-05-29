import { Stack } from "@mui/material";
import RolesTable from "../components/RolesIndex/RolesTable";
import PageHeader from "@/shared/components/PageHeader";
import RoleCreateDialog from "../components/RolesIndex/RoleCreateDialog";

const RolesIndex = () => {
  return (
    <Stack sx={{ p: "28px 26px", bgcolor: "white", borderRadius: 6 }}>
      <PageHeader title="Roles" action={<RoleCreateDialog />} />
      <RolesTable />
    </Stack>
  );
};

export default RolesIndex; 