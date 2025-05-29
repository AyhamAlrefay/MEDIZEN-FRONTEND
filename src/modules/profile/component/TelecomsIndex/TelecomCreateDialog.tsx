import { Button, Stack } from "@mui/material";
import { TelecomForm } from "./TelecomForm/TelecomForm";
import { StyledDialog } from "@/shared/components/Dialog/Dialog";
import { useCreateTelecom } from "../../hooks/useCreateTelecom";

function TelecomCreateDialog() {
  const {
    formSchema,
    isLoading,
    methods,
    onSubmit,
    handleCloseDialog,
    handleOpenDialog,
    openDialog,
  } = useCreateTelecom();

  return (
    <>
      <Button sx={{px:4,py:1}} variant="contained" onClick={handleOpenDialog}>Add Telecom</Button>
      <StyledDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={"Add Telecom"}
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
                save
              </Button>
            </Stack>
          }
        />
      </StyledDialog>
    </>
  );
}

export default TelecomCreateDialog;
