import { useForm } from "react-hook-form";
import { loginSchema, loginSchemaType } from "../helper/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthService } from "@/services/auth/auth.service";
import { useLocation, useNavigate } from "react-router-dom";
import { PagesRoutes } from "@/constants";
import { enqueueSnackbar } from "notistack";
import { authUtility } from "@/utils/auth";
export const useLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate, isPending } = useAuthService()
    .login()
    .useMutation({
      onSuccess(res) {
        if (res.data.status && res.data.loginData?.token) {
          authUtility.storeTokens(res.data.loginData?.token);
          enqueueSnackbar("Welcome back...", {
            variant: "success",
          });
          location.state
            ? navigate(`${location.state}`)
            : navigate(PagesRoutes.home.path);
        } else {
          enqueueSnackbar("Invalid credentials.", {
            variant: "error",
          });
          methods.reset();
        }
      },
    });

  const methods = useForm<loginSchemaType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = methods.handleSubmit(async (data) => {
    mutate(data);
  });
  return { methods, handleSubmit, isLoading: isPending };
};
