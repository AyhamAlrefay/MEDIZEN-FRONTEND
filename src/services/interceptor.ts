import { HttpCodes, HttpMethods, PagesRoutes } from "@/constants";
import { BasicBackendResponse } from "@/types";
import { authUtility } from "@/utils/auth";
import axios, { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";

const handleSuccessRequests = (
  res: AxiosResponse<BasicBackendResponse, any>,
) => {
  switch (res?.config?.method) {
    case HttpMethods.Post:
      enqueueSnackbar("Created successfully", {
        variant: "success",
      });
      break;
    case HttpMethods.Put:
      enqueueSnackbar("Updated successfully", {
        variant: "success",
      });
      break;
    case HttpMethods.Patch:
      enqueueSnackbar("Updated successfully", {
        variant: "success",
      });
      break;
    case HttpMethods.Delete:
      enqueueSnackbar("Deleted successfully", {
        variant: "success",
      });
      break;
  }
};

const handleFailRequests = (code: HttpCodes, msg?: string) => {
  switch (code) {
    case HttpCodes.Unauthorized:
      enqueueSnackbar(msg ?? "Unauthorized", {
        variant: "error",
      });
      authUtility.destroyTokens();
      window.location.href = PagesRoutes.auth.login.path;
      break;
    case HttpCodes.Forbidden:
      enqueueSnackbar(msg ?? "Role or Permission denied Error", {
        variant: "error",
      });
      break;
    case HttpCodes.NotFound:
      enqueueSnackbar(msg ?? "Not Found Error", {
        variant: "error",
      });
      window.location.href = "/404";
      break;
    case HttpCodes.Validation:
      enqueueSnackbar("Validation Error", {
        variant: "error",
      });
      break;
  }
};

const Axios = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

Axios.interceptors.request.use((req) => {
  const token = authUtility.getAccessToken();
  req.headers.Authorization = token ? `Bearer ${token}` : "";
  return req;
});

/* ----- response ---------- */

const UrlBlackList: string[] = [
  "/practitioner/auth/login",
  "/practitioner/auth/logout",
  "/practitioner/profile/update",
];

Axios.interceptors.response.use(
  (res: AxiosResponse<BasicBackendResponse, any>) => {
    const isNotBlockedUrl = !UrlBlackList.find(
      (e) => (res?.config?.url as string).match(e)?.length ?? 0,
    );
    if (res.data.status) {
      // if (isNotBlockedUrl) {
      //   handleSuccessRequests(res);
      // }
    } else {
      handleFailRequests(res?.data?.errNum, res?.data?.msg);
    }
    return res;
  },
  (error) => {
    handleFailRequests(error?.status);
    return Promise.reject(error);
  },
);

export default Axios;
