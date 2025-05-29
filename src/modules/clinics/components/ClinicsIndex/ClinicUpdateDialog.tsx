import { Clinic } from "@/services/clinics/clinics.types";
import { useUpdateClinic } from "@/modules/clinics/hooks/useUpdateClinic";
import { StyledDialog } from "@/shared/components/Dialog/Dialog";
import { ClinicForm } from "./ClinicForm/ClinicForm";
import { Button, IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
interface ClinicUpdateDialogProps {
  clinic: Clinic;
}
function ClinicUpdateDialog({ clinic }: ClinicUpdateDialogProps) {
  const {
    formSchema,
    isLoading,
    methods,
    onSubmit,
    handleCloseDialog,
    handleOpenDialog,
    openDialog,
  } = useUpdateClinic({ clinic });
  return (
    <>
      <IconButton onClick={handleOpenDialog}>
        <EditIcon />
      </IconButton>
      <StyledDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={"Edit Clinic"}
      >
        <ClinicForm
          clinic={clinic}
          formSchema={formSchema}
          methods={methods}
          onSubmit={onSubmit}
          actionsComponent={
            <Stack
              direction="row"
              sx={{
                justifyContent: "flex-end",
                mt: 2,
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

export default ClinicUpdateDialog;
