import { Button, Stack } from "@mui/material";
import { HealthCareEligibiltyForm } from "./HealthCareEligibiltyForm/HealthCareEligibiltyForm";
import { StyledDialog } from "@/shared/components/Dialog/Dialog";
import { useCreateHealthCareEligibilty } from "../../hooks/useCreateHealthCareEligibilty";
function CreateHealthCareEligibiltyDialog() {
  const {
    formSchema,
    isLoading,
    methods,
    onSubmit,
    handleCloseDialog,
    handleOpenDialog,
    openDialog,
  } = useCreateHealthCareEligibilty();

  return (
    <>
      <Button
        sx={{ px: 4, py: 1 }}
        variant="contained"
        onClick={handleOpenDialog}
      >
        Add Health Care Eligibilty Code
      </Button>
      <StyledDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={"Add Health Care Eligibilty Code"}
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
                save
              </Button>
            </Stack>
          }
        />
      </StyledDialog>
    </>
  );
}

export default CreateHealthCareEligibiltyDialog;
