import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useLogin } from "../hooks/useLogin";
import { ControlledTextField } from "@/shared/components/controlled/ControlledTextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { loginSchema } from "../helper/loginSchema";

export function LoginForm() {
  const { methods, handleSubmit, isLoading } = useLogin();
  const [view, setView] = useState(false);
  const handlePasswordView = () => {
    setView(!view);
  };
  return (
    <Stack component="form" sx={{ width: "100%" }} onSubmit={handleSubmit}>
      <Box mb="20px">
        <Typography variant="h5">Sign In</Typography>
      </Box>
      <ControlledTextField
        controllerProps={{
          name: "email",
          control: methods.control,
          schema: loginSchema,
        }}
        variant="filled"
      />
      <ControlledTextField
        type={view ? "text" : "password"}
        controllerProps={{
          name: "password",
          control: methods.control,
          schema: loginSchema,
        }}
        variant="filled"
        sx={{
          mb: "20px",
          mt: "10px",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              onClick={handlePasswordView}
              position="end"
              sx={{ cursor: "pointer" }}
            >
              {!view ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      <Button disabled={isLoading} variant="contained" type="submit">
        Login
      </Button>
    </Stack>
  );
}
