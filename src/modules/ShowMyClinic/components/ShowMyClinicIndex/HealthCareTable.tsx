import { DataTable } from "@/shared/components/DataTable";
import { useListColumns } from "./useListColumns";
import { Box, Stack, Typography } from "@mui/material";
import { HealthCare } from "@/services/healthCare/healthCare.types";

function HealthCareTable({ data }: { data?: HealthCare[] }) {
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
          loading={false}
          paginationMode="server"
          columns={columns}
          rows={data ?? []}
          hideFooter
        />
      </Box>
    </Box>
  );
}

export default HealthCareTable;
