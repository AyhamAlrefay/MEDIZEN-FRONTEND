import { Telecom } from "@/services/telecoms/telecom.types";
import { useUpdateTelecom } from "../../hooks/useUpdateTelecom";
import { StyledDialog } from "@/shared/components/Dialog/Dialog";
import { TelecomForm } from "./TelecomForm/TelecomForm";
import { Button, IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
interface TelecomUpdateDialogProps {
  telecom: Telecom;
}
function TelecomUpdateDialog({ telecom }: TelecomUpdateDialogProps) {
  const {
    formSchema,
    isLoading,
    methods,
    onSubmit,
    handleCloseDialog,
    handleOpenDialog,
    openDialog,
  } = useUpdateTelecom({ telecom });
  return (
    <>
      <IconButton onClick={handleOpenDialog}>
        <EditIcon />
      </IconButton>
      <StyledDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={"Edit Telecom"}
      >
        <TelecomForm
          formSchema={formSchema}
          methods={methods}
          onSubmit={onSubmit}
          actionsComponent={
            <Stack
              direction="row"
              sx={{
                justifyContent: "flex-end",
                mt: "5rem",
                columnGap: "1.75rem",
              }}
            >
              <Button
                type="button"
                sx={{ paddingX: 7, paddingY: 1 }}
                variant="outlined"
                onClick={handleCloseDialog}
              >
                cancel
              </Button>
              <Button
                type="submit"
                sx={{ paddingX: 7, paddingY: 1 }}
                variant="contained"
                disabled={isLoading}
              >
                edit
              </Button>
            </Stack>
          }
        />
      </StyledDialog>
    </>
  );
}

export default TelecomUpdateDialog;
