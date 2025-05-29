import { useUpdateHealthCareEligibilty } from "@/modules/healthCareEligibilty/hooks/useUpdateHealthCareEligibilty";
import { StyledDialog } from "@/shared/components/Dialog/Dialog";
import { HealthCareEligibiltyForm } from "./HealthCareEligibiltyForm/HealthCareEligibiltyForm";
import { Button, IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { HealthCareEligibilty } from "@/services/healthCareEligibilty/healthCareEligibilty.types";
interface HealthCareEligibiltyUpdateDialogProps {
  healthCareEligibilty: HealthCareEligibilty;
}
function HealthCareEligibiltyUpdateDialog({
  healthCareEligibilty,
}: HealthCareEligibiltyUpdateDialogProps) {
  const {
    formSchema,
    isLoading,
    methods,
    onSubmit,
    handleCloseDialog,
    handleOpenDialog,
    openDialog,
  } = useUpdateHealthCareEligibilty({ healthCareEligibilty });
  return (
    <>
      <IconButton onClick={handleOpenDialog}>
        <EditIcon />
      </IconButton>
      <StyledDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={"Edit Health Care Eligibilty"}
      >
        <HealthCareEligibiltyForm
          formSchema={formSchema}
          methods={methods}
          onSubmit={onSubmit}
          actionsComponent={
            <Stack
              direction="row"
              sx={{
                justifyContent: "flex-end",
                mt: 5,
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

export default HealthCareEligibiltyUpdateDialog;
