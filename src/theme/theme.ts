import { createTheme, type Theme } from "@mui/material";
import { typography } from "./typography";
import { palette } from "./palette";

export const theme: Theme = createTheme({
  typography,
  palette,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          borderRadius: "10px",

        }
      }
    }
  }
});
