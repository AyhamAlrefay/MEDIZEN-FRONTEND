import { DataTable } from "@/shared/components/DataTable";
import { useListColumns } from "./useListColumns";
import { Box, Stack, Typography } from "@mui/material";
import { useClinicsService } from "@/services/clinics/clinics.service";
import { Clinic } from "@/services/clinics/clinics.types";

function ClinicsTable({ clinic }: { clinic?: Clinic }) {
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
          Clinic
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
          rows={clinic ? [clinic] : []}
          hideFooter
        />
      </Box>
    </Box>
  );
}

export default ClinicsTable;
