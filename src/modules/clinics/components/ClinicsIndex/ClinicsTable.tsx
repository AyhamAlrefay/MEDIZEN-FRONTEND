import { DataTable } from "@/shared/components/DataTable";
import { useListColumns } from "./useListColumns";
import { Box, Stack, Typography } from "@mui/material";
import { useClinicsService } from "@/services/clinics/clinics.service";

function ClinicsTable() {
  const { data, isLoading } = useClinicsService().index().useQuery();
  const Clinics = data?.data?.clinics?.data;

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
          Clinics
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
          rows={Clinics ?? []}
          paginationModel={{
            page: data?.data?.clinics?.meta?.current_page ?? 0,
            pageSize: data?.data?.clinics?.meta?.per_page ?? 10,
          }}
        />
      </Box>
    </Box>
  );
}

export default ClinicsTable;
