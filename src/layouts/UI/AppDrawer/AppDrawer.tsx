import { useState } from "react";

import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, styled, Theme } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";
import { AppDrawerContent } from "@/layouts/UI/AppDrawer/AppDrawerContent";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: theme.palette.background.paper,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: theme.palette.background.paper,
  //borderRight: 0,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export function AppDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Drawer variant="permanent" open={false}></Drawer>
      <Drawer
        onMouseEnter={() => {
          setDrawerOpen(true);
        }}
        onMouseLeave={() => {
          setDrawerOpen(false);
        }}
        sx={{
          position: "absolute",
          "& .MuiDrawer-paper": {
            borderWidth: 0,
            borderRight: "none",
            boxShadow: "0px 5px 4px #e2e2e2",
            transition: "width 0.28s ease-out",
          },
        }}
        variant="permanent"
        open={drawerOpen}
      >
        <div className=" flex items-center justify-center p-2 h-16 ">
          <Stack
            alignItems="center"
            justifyContent={"center"}
            direction={"row"}
            gap={1}
            py={1}
          >
            <Box
              component={"img"}
              src="/assets/logo/logo-MediZen.png"
              width={50}
            ></Box>
            {drawerOpen && (
              <Typography fontWeight={"bolder"} color={"#48BE94"} variant="h4">
                MediZen
              </Typography>
            )}
          </Stack>
        </div>
        <Divider />
        <AppDrawerContent
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      </Drawer>
    </>
  );
}
