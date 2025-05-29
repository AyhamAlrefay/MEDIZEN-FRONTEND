import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export function HealthCareComponent() {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Outlet />
    </Stack>
  );
}
