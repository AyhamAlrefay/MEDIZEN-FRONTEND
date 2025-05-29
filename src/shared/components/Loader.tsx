import { Backdrop, CircularProgress, SxProps } from "@mui/material";

export function Loader({ loading, sx }: { loading: boolean; sx?: SxProps }) {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: "relative",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        height: "auto",
        minHeight: 500,
        borderRadius: "1rem",
        ...sx,
      }}
      open={loading}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
}
