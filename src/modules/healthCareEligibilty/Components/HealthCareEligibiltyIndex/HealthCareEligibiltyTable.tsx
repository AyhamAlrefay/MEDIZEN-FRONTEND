import { DataTable } from "@/shared/components/DataTable";
import { useListColumns } from "./useListColumns";
import { Box, Stack, Typography } from "@mui/material";
import { useHealthCareEligibiltyService } from "@/services/healthCareEligibilty/healthCareEligibilty.service";

function HealthCareEligibiltyTable() {
  const { data, isLoading } = useHealthCareEligibiltyService()
    .index()
    .useQuery();
  const healthCareEligibiltyServices =
    data?.data?.healthCareServiceEligibilityCodes?.data;

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
          Health Care Services Eligibilty
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
          rows={healthCareEligibiltyServices ?? []}
          paginationModel={{
            page:
              data?.data?.healthCareServiceEligibilityCodes?.meta
                ?.current_page ?? 0,
            pageSize:
              data?.data?.healthCareServiceEligibilityCodes?.meta?.per_page ??
              10,
          }}
        />
      </Box>
    </Box>
  );
}

export default HealthCareEligibiltyTable;
