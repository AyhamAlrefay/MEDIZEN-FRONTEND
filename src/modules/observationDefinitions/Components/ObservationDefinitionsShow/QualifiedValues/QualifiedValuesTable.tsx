import { DataTable } from "@/shared/components/DataTable";
import { useListColumns } from "./useListColumns";
import { Box, Stack, Typography } from "@mui/material";
import { useQualifiedValuesService } from "@/services/qualifiedValues/qualifiedValues.service";

function QualifiedValuesTable({ id }: { id?: number }) {
  const { data, isLoading } = useQualifiedValuesService().index().useQuery(id);
  const QualifiedValues = data?.data?.qualified_values?.data;

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
          Qualified Values
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
          rows={QualifiedValues ?? []}
          paginationModel={{
            page: data?.data?.qualified_values?.meta?.current_page ?? 0,
            pageSize: data?.data?.qualified_values?.meta?.per_page ?? 10,
          }}
        />
      </Box>
    </Box>
  );
}

export default QualifiedValuesTable;
