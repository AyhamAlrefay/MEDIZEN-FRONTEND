import { Box, Stack, Typography } from "@mui/material";

import { LoginForm } from "../components/LoginForm";
function SignIn() {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Box
        flex={2}
        sx={{
          display: { xs: "none", md: "grid" },
          placeItems: "center",
          width: "100%",
          bgcolor: "#d1d1d11a",
          minHeight: "100vh",
        }}
        style={{
          backgroundImage: 'url("/assets/health-bg.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></Box>
      <Box
        flex={1}
        sx={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          px: { xs: 2, md: 5, lg: 10 },
          width: "100%",
        }}
      >
        <Box maxWidth={{ xs: "100%", md: 500 }} width={"100%"}>
          <Stack justifyContent={"center"} alignItems={"center"} mb={2}>
            <Box
              component={"img"}
              src="/assets/logo/logo-MediZen.png"
              width={150}
              height={150}
            />
            <Typography mt={2} variant="h4">
              Welcome to MediZen
            </Typography>
          </Stack>
          <LoginForm />
        </Box>
      </Box>
    </Stack>
  );
}
export default SignIn;
