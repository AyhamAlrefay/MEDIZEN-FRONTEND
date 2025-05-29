import { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  Divider,
  styled,
  SvgIcon,
  SvgIconProps,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useIsActiveRoute } from "@/shared/hooks/useIsActiveRoute";

export const StyledIcon = styled((p: SvgIconProps & { open: boolean }) => {
  const { ...rest } = p;
  return <ExpandMoreIcon {...rest} />;
})(({ open }) => ({
  transition: "transform 300ms ease-in-out",
  ...(open && { transform: "rotate(180deg)" }),
}));

export interface AppDrawerBootstrapItemProps {
  drawerOpen: boolean;
  label: string;
  Icon: React.ReactNode;
  to?: string;
  setDrawerOpen: (e: boolean) => void;
  sub?: Array<Omit<AppDrawerBootstrapItemProps, "setDrawerOpen"> | undefined>;
  divider?: boolean;
}

export function AppDrawerBootstrapItem(props: AppDrawerBootstrapItemProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    props.setDrawerOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const hasChildren = !!props.sub;

  const renderItem = ({ isActive }: { isActive: boolean }) => (
    <ListItemButton
      onClick={() => {
        if (hasChildren) {
          open ? handleClose() : handleOpen();
        }
      }}
      sx={{
        minHeight: 40,
        justifyContent: props.drawerOpen ? "initial" : "center",
        px: 2,
        py: 0,
        borderWidth: 2,
        borderRadius: 2,
        transition: "box-shadow 0.4s",
        ...(isActive && {
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        }),
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: props.drawerOpen ? 3 : "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SvgIcon sx={{ color: isActive ? "primary.main" : "inherit" }}>
          {props.Icon}
        </SvgIcon>
      </ListItemIcon>
      <ListItemText
        sx={{
          opacity: props.drawerOpen ? 1 : 0,
          color: isActive ? "primary.main" : "inherit",
        }}
      >
        <Typography
          sx={{
            textTransform: "capitalize",
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
            fontWeight: isActive ? 600 : 400,
          }}
        >
          {props.label}

          {props.sub && <StyledIcon open={isActive} />}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );

  const { isActive, shouldNavigate } = useIsActiveRoute({ to: props.to ?? {} });
  const navigate = useNavigate();

  return (
    <>
      <ListItem component="div" disablePadding sx={{ display: "block", py: 1 }}>
        {props.to ? (
          <div
            onClick={() => {
              !shouldNavigate && navigate(props.to ?? "");
            }}
            className="w-full"
          >
            {renderItem({ isActive })}
          </div>
        ) : (
          renderItem({ isActive: open })
        )}
        {/* </Tooltip> */}

        {props.sub && (
          <Collapse
            sx={{
              marginLeft: props.drawerOpen ? 2 : 0,
              transition: "all 0.3s",
            }}
            in={open}
          >
            {props.sub?.map((el) => {
              if (el) {
                return (
                  <AppDrawerBootstrapItem
                    key={el.label}
                    {...el}
                    setDrawerOpen={props.setDrawerOpen}
                  />
                );
              }
              return null;
            })}
          </Collapse>
        )}
      </ListItem>
      {props.divider && <Divider sx={{ my: 1 }} />}
    </>
  );
}
