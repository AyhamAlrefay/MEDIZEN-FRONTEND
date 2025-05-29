import { DataTable } from "@/shared/components/DataTable";
import { useListColumns } from "./useListColumns";
import { Box, Stack, Typography } from "@mui/material";
import { usePatientService } from "@/services/patients/patients.service";

function PatientsTable() {
  const { data, isLoading } = usePatientService().index().useQuery();
  const Patients = data?.data?.patients?.data;
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
          Patients
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
          rows={Patients ?? []}
          paginationModel={{
            page: data?.data?.patients?.meta?.current_page ?? 0,
            pageSize: data?.data?.patients?.meta?.per_page ?? 10,
          }}
        />
      </Box>
    </Box>
  );
}

export default PatientsTable;
