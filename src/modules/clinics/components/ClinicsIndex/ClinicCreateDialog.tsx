import { Button, Stack } from "@mui/material";
import { ClinicForm } from "./ClinicForm/ClinicForm";
import { StyledDialog } from "@/shared/components/Dialog/Dialog";
import { useCreateClinic } from "@/modules/clinics/hooks/useCreateClinic";

function ClinicCreateDialog() {
  const {
    formSchema,
    isLoading,
    methods,
    onSubmit,
    handleCloseDialog,
    handleOpenDialog,
    openDialog,
  } = useCreateClinic();

  return (
    <>
      <Button
        sx={{ px: 4, py: 1 }}
        variant="contained"
        onClick={handleOpenDialog}
      >
        Add Clinic
      </Button>
      <StyledDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={"Add Clinic"}
      >
        <ClinicForm
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
                save
              </Button>
            </Stack>
          }
        />
      </StyledDialog>
    </>
  );
}

export default ClinicCreateDialog;
