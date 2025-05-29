import { DataTable } from "@/shared/components/DataTable";
import { useListColumns } from "./useListColumns";
import { Box, Stack, Typography } from "@mui/material";
import { useObservationDefinitionsService } from "@/services/observationDefinitions/observationDefinitions.service";

function ObservationDefinitionsTable() {
  const { data, isLoading } = useObservationDefinitionsService()
    .index()
    .useQuery();
  const ObservationDefinitions = data?.data?.observation_definitions?.data;

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
          Observation Definitions
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
          rows={ObservationDefinitions ?? []}
          paginationModel={{
            page: data?.data?.observation_definitions?.meta?.current_page ?? 0,
            pageSize: data?.data?.observation_definitions?.meta?.per_page ?? 10,
          }}
        />
      </Box>
    </Box>
  );
}

export default ObservationDefinitionsTable;
