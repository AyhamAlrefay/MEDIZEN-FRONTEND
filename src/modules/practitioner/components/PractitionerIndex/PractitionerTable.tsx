import { DataTable } from "@/shared/components/DataTable";
import { useListColumns } from "./useListColumns";
import { Box, Stack, Typography } from "@mui/material";
import { usePractitionerService } from "@/services/practitioner/practitioner.service";

function PractitionerTable() {
  const { data, isLoading } = usePractitionerService().index().useQuery();
  const practitioners = data?.data?.practitioners?.data;

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
          Practitioners
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
          rows={practitioners ?? []}
          paginationModel={{
            page: data?.data?.practitioners?.meta?.current_page ?? 0,
            pageSize: data?.data?.practitioners?.meta?.per_page ?? 10,
          }}
        />
      </Box>
    </Box>
  );
}

export default PractitionerTable;
