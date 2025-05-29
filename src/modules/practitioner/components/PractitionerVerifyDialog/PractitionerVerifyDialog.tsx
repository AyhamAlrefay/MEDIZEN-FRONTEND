import { Stack, Typography } from "@mui/material";
import OTPInput from "./OtpCodeInput";
import { StyledDialog } from "@/shared/components/Dialog/Dialog";
import { ReactNode } from "react";
interface PractitionerVerifyDialogProps {
  opened: boolean;
  onClose: () => void;
  email: string;
  onVerifySuccess: () => void;
  actionBtn?: ReactNode;
}
function PractitionerVerifyDialog({
  opened,
  onClose,
  email,
  onVerifySuccess,
  actionBtn,
}: PractitionerVerifyDialogProps) {
  return (
    <>
      {actionBtn && actionBtn}
      <StyledDialog open={opened} onClose={onClose} title={"Verify Account"}>
        <Stack mt={2} alignItems={"center"} justifyContent={"center"}>
          <Typography
            mb={3}
            textAlign={"center"}
            variant="subtitle1"
            color="primary"
          >
            Enter code was sent to your email
          </Typography>
          <OTPInput
            onVerifySuccess={() => {
              onClose();
              onVerifySuccess();
            }}
            email={email}
          />
        </Stack>
      </StyledDialog>
    </>
  );
}

export default PractitionerVerifyDialog;
