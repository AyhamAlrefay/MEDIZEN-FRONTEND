import React from "react";
import { Box, Typography } from "@mui/material";

export function DataTableTemplate({
  children,
  title,
  topBar,
}: {
  children: React.ReactNode;
  title: string;
  topBar?: {
    renderComponent: React.ReactNode;
  };
}) {
  return (
    <Box
      sx={{
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0px 5px 4px #e2e2e2",
        borderColor: " #f8f8f8",
      }}
    >
      <Box
        sx={{
          bgcolor: "primary.main",
          display: "flex",
          alignItems: "center",
          height: "48px",
          px: "1rem",
        }}
      >
        <Typography variant="subtitle1" color="text.light">
          {title}
        </Typography>
        {topBar?.renderComponent}
      </Box>
      {children}
    </Box>
  );
}
