import { AppBar } from "@/layouts/UI/AppBar/AppBar";
import { AppDrawer } from "@/layouts/UI/AppDrawer/AppDrawer";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "@/errors/ErrorBoundary";

export function DashboardLayout(): JSX.Element {
  return (
    <ThemeProvider>
      <Box sx={{ minHeight: "100vh", display: "flex", overflowY: "auto" }}>
        <AppDrawer />
        <Stack
          sx={{ px: "28px", width: "100%", pb: "30px", overflowX: "hidden" }}
          gap={2}
        >
          <AppBar />
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
