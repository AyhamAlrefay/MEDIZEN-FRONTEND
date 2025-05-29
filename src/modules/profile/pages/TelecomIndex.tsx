import { Stack, Typography } from "@mui/material";
import TelecomsTable from "../component/TelecomsIndex/TelecomsTable";
import TelecomCreateDialog from "../component/TelecomsIndex/TelecomCreateDialog";
import PageHeader from "@/shared/components/PageHeader";

const TelecomIndex = () => {
  return (
    <Stack sx={{ p: "28px 26px", bgcolor: "white", borderRadius: 6 }}>
      <PageHeader title="Telecoms" action={<TelecomCreateDialog />} />
      <TelecomsTable />
    </Stack>
  );
};

export default TelecomIndex;
