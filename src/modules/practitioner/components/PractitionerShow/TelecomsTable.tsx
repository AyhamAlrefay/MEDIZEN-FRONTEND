import { DataTable } from "@/shared/components/DataTable";
import { useListColumns } from "./useTelecomsListColumns";
import { Box, Stack, Typography } from "@mui/material";
import { useTelecomService } from "@/services/telecoms/telecom.service";
import { Telecom } from "@/services/telecoms/telecom.types";

function TelecomsTable({ telecoms }: { telecoms?: Telecom[] }) {
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
        <DataTable columns={columns} rows={telecoms ?? []} hideFooter />
      </Box>
    </Box>
  );
}

export default TelecomsTable;
