import { Practitioner } from "@/services/practitioner/practitioner.types";
import { DataTable } from "@/shared/components/DataTable";
import { useListColumns } from "./useQualificationsListColumns";
import { Box, Stack, Typography } from "@mui/material";
interface QualificationsTableProps {
  qualifications: Practitioner["qualifications"];
}
function QualificationsTable({ qualifications }: QualificationsTableProps) {
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
          Qualifications
        </Typography>
      </Stack>
      <Box
        sx={{
          pt: "20px",
          bgcolor: "white",
        }}
      >
        <DataTable
          withoutSearchFilter
          hideFooter
          columns={columns}
          rows={qualifications??[]}
        />
      </Box>
    </Box>
  );
}

export default QualificationsTable;
