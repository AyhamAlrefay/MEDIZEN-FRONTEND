import List from "@mui/material/List";
import { NavbarList } from "./AppDrawerLinks";
import { AppDrawerBootstrapItem } from "./AppDrawerBootstrapItem";
import { Can } from "@/can/Can";

export const AppDrawerContent = ({
  drawerOpen,
  setDrawerOpen,
}: {
  drawerOpen: boolean;
  setDrawerOpen: (e: boolean) => void;
}) => {
  return (
    <List sx={{ mx: 1, mb: 2, textAlign: "center" }}>
      {NavbarList.map((link, index: number) => (
        <Can action={link.action}>
          <AppDrawerBootstrapItem
            key={index}
            to={link.link}
            drawerOpen={drawerOpen}
            label={link.label}
            Icon={link.icon}
            setDrawerOpen={setDrawerOpen}
          />
        </Can>
      ))}
    </List>
  );
};
