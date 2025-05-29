import { DataTable } from "@/shared/components/DataTable";
import { useListColumns } from "./useListColumns";
import { Box, Stack, Typography } from "@mui/material";
import { useHealthCareService } from "@/services/healthCare/healthCare.service";

function HealthCareTable() {
  const { data, isLoading } = useHealthCareService().index().useQuery();
  const healthCareServices = data?.data?.healthCareServices?.data;

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
          Health Care Services
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
          rows={healthCareServices ?? []}
          paginationModel={{
            page: data?.data?.healthCareServices?.meta?.current_page ?? 0,
            pageSize: data?.data?.healthCareServices?.meta?.per_page ?? 10,
          }}
        />
      </Box>
    </Box>
  );
}

export default HealthCareTable;
