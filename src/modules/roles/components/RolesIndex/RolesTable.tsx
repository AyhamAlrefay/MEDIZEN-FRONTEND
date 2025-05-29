import { DataTable } from "@/shared/components/DataTable";
import { Box, Stack, Typography } from "@mui/material";
import { useRolesService } from "@/services/roles/roles.service";
import { useListColumns } from "./useListColumns";

function RolesTable() {
  const { data, isLoading } = useRolesService().index().useQuery();
  const roles = data?.data?.roles?.data;

  const { columns } = useListColumns();

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          height: "3rem",
          borderRadius: "15px 15px 0 0",
          paddingInlineStart: "16px",
          bgcolor: "primary.main",
        }}
      >
        <Typography variant="subtitle1" color="text.light">
          Roles
        </Typography>
      </Stack>
      <Box
        sx={{
          pt: "20px",
          bgcolor: "white",
        }}
      >
        <DataTable
          loading={isLoading}
          paginationMode="server"
          columns={columns}
          rows={roles ?? []}
          paginationModel={{
            page: data?.data?.roles?.meta?.current_page ?? 0,
            pageSize: data?.data?.roles?.meta?.per_page ?? 10,
          }}
        />
      </Box>
    </Box>
  );
}

export default RolesTable; 