import { DataTable } from "@/shared/components/DataTable";
import { useListColumns } from "./useListColumns";
import { Box, Stack, Typography } from "@mui/material";
import { useTelecomService } from "@/services/telecoms/telecom.service";

function TelecomsTable() {
  const { data, isLoading } = useTelecomService().index().useQuery();
  const telecoms = data?.data?.telecoms?.data;
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
          Telecoms
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
          rows={telecoms ?? []}
          paginationModel={{
            page: data?.data?.telecoms?.meta?.current_page ?? 0,
            pageSize: data?.data?.telecoms?.meta?.per_page ?? 10,
          }}
        />
      </Box>
    </Box>
  );
}

export default TelecomsTable;
