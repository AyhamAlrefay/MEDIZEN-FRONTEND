import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";

const _StyledDialog = styled(Dialog)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    ".MuiDialog-container .MuiPaper-root": {
      width: "90%",
    },
  },
  [theme.breakpoints.up("md")]: {
    ".MuiDialog-container .MuiPaper-root": {
      width: "100%",
    },
  },
}));

interface IProps extends DialogProps {
  title: string;
  dialogactions?: React.ReactNode;
}
export function StyledDialog(props: IProps) {
  const { ...restProps } = props;
  return (
    <_StyledDialog {...restProps}>
      <DialogTitle color="primary" variant="subtitle1">
        {props.title}
      </DialogTitle>
      <DialogContent sx={{ marginTop: "-8px" }}>{props.children}</DialogContent>
      <DialogActions sx={{ px: 2, pb: 2 }}>{props.dialogactions}</DialogActions>
    </_StyledDialog>
  );
}
