"use client";
import React from "react";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { theme } from "@/theme/theme";
import { styles } from "@/styles/globalStyles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
interface IProps {
  children: React.ReactNode;
}
function ThemeProvider({ children }: IProps): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={styles} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </MuiThemeProvider>
  );
}

export { ThemeProvider };
