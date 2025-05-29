import { FC, memo, useState } from "react";

import { IconButton, Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface EditImageMenuProps {
  handleDelete: () => void;
  handleEdit: () => void;
  disabled?: boolean;
  onClickWhileIsDisabled?: () => void;
}

const EditImageMenu: FC<EditImageMenuProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (props.disabled) {
      props.onClickWhileIsDisabled?.();
      return;
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          backgroundColor: "white",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          ":hover": {
            backgroundColor: "whitesmoke",
          },
          position: "absolute",
          bottom: 0,
          right: 0,
          userSelect: "none",
        }}
        disableRipple={props.disabled}
      >
        <EditIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuItem
          sx={{ height: 35, alignItems: "center", gap: 1 }}
          onClick={() => {
            props.handleEdit();
            handleClose();
          }}
        >
          <EditIcon />
          <Typography variant="subtitle2" sx={{ ml: 0.3 }}>
            edit
          </Typography>
        </MenuItem>
        <MenuItem
          sx={{ height: 35, alignItems: "center", gap: 1 }}
          onClick={() => {
            props.handleDelete();
            handleClose();
          }}
        >
          <DeleteIcon color="error" />
          <Typography variant="subtitle2" color={"error"}>
            {" "}
            delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo(EditImageMenu);
