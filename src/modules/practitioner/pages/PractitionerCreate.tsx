import { useCreatePractitioner } from "@/modules/practitioner/hooks/useCreatePractitioner";
import {
  Box,
  Button,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PractitionerForm } from "../components/PractitionerCreate/PractitionerForm/PractitionerForm";
import OTPInput from "../components/PractitionerVerifyDialog/OtpCodeInput";
import PractitionerVerifyDialog from "../components/PractitionerVerifyDialog/PractitionerVerifyDialog";

function PractitionerCreate() {
  const {
    formSchema,
    isLoading,
    methods,
    onSubmit,
    openDialog,
    handleCloseDialog,
  } = useCreatePractitioner();
  const navigate = useNavigate();

  return (
    <Stack sx={{ bgcolor: "white", borderRadius: 6, p: "28px 26px" }}>
      <Stack mb="1rem">
        <Typography variant="h6" color="primary">
          Add Practitioner
        </Typography>

        <PractitionerForm
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
                onClick={() => navigate(-1)}
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

        <PractitionerVerifyDialog
          opened={openDialog}
          onClose={handleCloseDialog}
          email={methods.watch("email")}
          onVerifySuccess={() => {
            methods.reset();
          }}
        />
      </Stack>
    </Stack>
  );
}

export default PractitionerCreate;
