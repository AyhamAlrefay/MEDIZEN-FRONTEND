import React, { FormEvent } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function CreateTemplate({
  children,
  title,
  onSubmit,
}: {
  children: React.ReactNode;
  title: string;
  onSubmit: (e: FormEvent) => void;
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "white",
        height: "auto",
        minHeight: 500,
        borderRadius: "1rem",
        backdropFilter: "saturate(100%) blur(0.5rem)",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        padding: "20px 30px",
        pb: "40px",
        paddingInlineEnd: "50px",
      }}
    >
      <Stack height="100%">
        <Typography variant="h6" color="primary">
          {title}
        </Typography>
        <Stack component="form" onSubmit={onSubmit} mt={4} height={"100%"}>
          <Box mb={4}>{children}</Box>
          <Stack direction="row" alignSelf="flex-end" mt="auto" gap={3}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(-1)}
              sx={{
                p: "6px 20px",
                height: "fit-content",
                width: 140,
                borderRadius: "10px",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                p: "6px 20px",
                height: "fit-content",
                width: 140,
                borderRadius: "10px",
              }}
            >
              Create
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
