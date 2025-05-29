import { Box, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SideList } from "./component/SideList";

export function ProfileComponent() {
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      sx={{
        borderRadius: 2,
        mt: 1,
        gap: "14px",
        width: "100%",
        height:'100%',
        display: "flex",
      }}
    >
      <Box
        sx={{
          height: { xs: "fit-content", lg: "100%" },
          maxWidth: { xs: "100%", lg: 260 },
          width: "100%",
          bgcolor: "white",
          borderRadius: 6,
          p: "28px 13px",
        }}
      >
        <Typography variant="h6" mb={1} color="primary">
          Profile
        </Typography>
        <SideList />
      </Box>

      <Box
        sx={{
          height: "100%",
          width: "100%",
          borderRadius: 6,
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Stack>
  );
}
