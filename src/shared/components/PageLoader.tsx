import { Box, CircularProgress } from "@mui/material";

export function PageLoader() {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}
