import { useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteDialog } from "../Dialog/DeleteDialog";
import { useDialog } from "@/shared/hooks/useDialog";

export function DeleteAction({
  title,
  desc,
  onDelete,
}: {
  title: string;
  desc?: string;
  onDelete: () => Promise<unknown>;
}) {
  const { openDialog, handleCloseDialog, handleOpenDialog } = useDialog();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <IconButton size="small" onClick={handleOpenDialog}>
        <DeleteIcon color="error" />
      </IconButton>
      <DeleteDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        title={title}
        desc={desc}
        onDelete={() => {
          setLoading(true);
          onDelete()
            .then(() => handleCloseDialog())
            .finally(() => setLoading(false));
        }}
        loading={loading}
      />
    </>
  );
}
