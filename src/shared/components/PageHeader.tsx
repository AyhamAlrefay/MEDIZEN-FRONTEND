import { Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  action?: ReactNode;
}
function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <Stack
      mb={2}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography variant="subtitle1" color={"primary"}>
        Manage {title}
      </Typography>
      {action}
    </Stack>
  );
}

export default PageHeader;
