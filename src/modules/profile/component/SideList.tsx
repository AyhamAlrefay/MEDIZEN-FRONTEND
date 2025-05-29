import { PagesRoutes } from "@/constants";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { SvgIcon, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";

export const BootstrappedNavItem = ({
  primary,
  to,
  icon,
}: {
  primary: string;
  to: string;
  icon?: React.ReactNode;
}) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <ListItem disablePadding component={"div"}>
          <ListItemButton
            sx={{
              minHeight: 58,
              px: 2,
              py: 0,
              borderWidth: 2,
              borderRadius: 2,
              transition: "box-shadow 0.4s",
              gap: "13px",
              color: isActive ? "primary" : "darkgray",
            }}
            className={isActive ? "shadow-md" : ""}
          >
            <SvgIcon
              sx={{
                width: 18,
                heigh: 18,
                fontSize: "18px",
                color: isActive ? "primary.main" : "text.darkGray",
              }}
            >
              {icon}
            </SvgIcon>
            <ListItemText
              primary={
                <Typography
                  color={isActive ? "primary" : "darkgray"}
                  lineHeight={1.3}
                  variant={isActive ? "subtitle1" : "body1"}
                >
                  {primary}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      )}
    </NavLink>
  );
};

export const SideList = () => {
  return (
    <List
      sx={{
        whiteSpace: "nowrap",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <BootstrappedNavItem
        to={PagesRoutes.profile.path}
        primary="Personal Info"
        icon={<AccountCircleOutlinedIcon />}
      />
      <BootstrappedNavItem
        to={PagesRoutes.profile.children.telecoms.path}
        primary="Telecoms"
        icon={<LocalPhoneIcon />}
      />
    </List>
  );
};
