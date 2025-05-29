import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import { StyledDialog } from "@/shared/components/Dialog/Dialog";
import { useDialog } from "@/shared/hooks/useDialog";
import { useAuthService } from "@/services/auth/auth.service";
import { useAuth } from "@/utils/auth";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { PagesRoutes } from "@/constants";

export function AppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { openDialog, handleOpenDialog, handleCloseDialog } = useDialog();
  const open = Boolean(anchorEl);
  const { doLogout } = useAuth();
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate, isPending } = useAuthService()
    .logout()
    .useMutation({
      onSuccess(res) {
        if (res.data.status) {
          handleCloseDialog();
          doLogout();
        } else {
          enqueueSnackbar({
            message: "Logout failed",
            variant: "error",
          });
        }
      },
    });

  const handleLogoutClick = () => {
    mutate({});
  };

  return (
    <Stack
      direction="row"
      alignItems={"center"}
      justifyContent="space-between"
      sx={{
        bgcolor: "white",
        px: "1rem",
        my: "12px",
        borderRadius: "1rem",
        minHeight: 64,
        backdropFilter: "saturate(100%) blur(0.5rem)",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      <Typography variant="subtitle1" color="primary">
        Dashboard
      </Typography>

      <Stack direction="row" spacing={1}>
        <>
          <IconButton size="large" onClick={handleClick}>
            <PersonIcon fontSize="medium" color="primary" />
          </IconButton>
          {/* <Button
            startIcon={<PersonIcon fontSize="small" color="primary" />}
            onClick={handleClick}
            sx={{
              borderRadius: 1,
              px: 3,
              py: 1,
            }}
          >
            <Typography variant="subtitle2" color="primary">
              Menu
            </Typography>
          </Button> */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: "center", vertical: "top" }}
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            slotProps={{
              paper: {
                sx: {
                  maxWidth: 200,
                  width: "100%",
                  borderRadius: "14px",
                  mt: 0,
                  transform: "translateX(-10px) !important",
                  backdropFilter: "saturate(100%) blur(0.5rem)",
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                },
              },
            }}
          >
            <MenuItem
              sx={{
                borderBottom: `1px solid rgba(226, 226, 226, 1)`,
                px: 2,
                py: 1.5,
              }}
              onClick={() => {
                handleClose();
                setTimeout(() => {
                  navigate(PagesRoutes.profile.path);
                }, 500);
              }}
            >
              <AccountCircleOutlinedIcon
                color="primary"
                sx={{ w: 20, h: 20 }}
              />
              <Typography variant="body1" sx={{ mx: "12px" }}>
                Personal Info
              </Typography>
            </MenuItem>
            <MenuItem
              sx={{
                borderBottom: `1px solid rgba(226, 226, 226, 1)`,
                px: 2,
                py: 1.5,
              }}
              onClick={() => {
                handleClose();
                setTimeout(() => {
                  navigate(PagesRoutes.organization.path);
                }, 500);
              }}
            >
              <BusinessIcon
                color="primary"
                sx={{ w: 20, h: 20 }}
              />
              <Typography variant="body1" sx={{ mx: "12px" }}>
                Organization
              </Typography>
            </MenuItem>

            <MenuItem
              sx={{
                px: 2,
                py: 1.5,
              }}
              onClick={() => {
                handleClose();
                handleOpenDialog();
              }}
            >
              <LogoutIcon color="primary" sx={{ w: 20, h: 20 }} />
              <Typography variant="body1" sx={{ mx: "12px" }}>
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </>
      </Stack>
      <StyledDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title="Logout"
        dialogactions={
          <>
            <Button
              type="button"
              sx={{ px: 4, py: 1 }}
              variant="outlined"
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              type="submit"
              color="error"
              sx={{ px: 4, py: 1 }}
              variant="contained"
              onClick={handleLogoutClick}
            >
              Logout
            </Button>
          </>
        }
      >
        <Typography color="black" variant="body1">
          Are you sure you want to logout
        </Typography>
      </StyledDialog>
    </Stack>
  );
}
