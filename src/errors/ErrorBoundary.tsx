import { Box, Button, Typography } from "@mui/material";
import React from "react";
import {
  ErrorBoundary as _ErrorBoundary,
  FallbackProps,
} from "react-error-boundary";

function fallbackRender({
  error,
  resetErrorBoundary,
}: {
  error: FallbackProps["error"];
  resetErrorBoundary: FallbackProps["resetErrorBoundary"];
}) {
  return (
    <Box
      sx={{
        background: "white",
        height: "auto",
        borderRadius: "1rem",
        backdropFilter: "saturate(100%) blur(0.5rem)",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        padding: "20px 30px",
        pb: "40px",
        paddingInlineEnd: "50px",
      }}
      role="alert"
    >
      <Typography variant="h4" color="primary">
        Something went wrong:
      </Typography>
      <Typography variant="h6" mt={2}>
        {error.message}
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 2, minWidth: 200 }}
        onClick={() => resetErrorBoundary()}
      >
        Reset
      </Button>
    </Box>
  );
}
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <_ErrorBoundary FallbackComponent={fallbackRender}>
      {children}
    </_ErrorBoundary>
  );
}

export default ErrorBoundary;
