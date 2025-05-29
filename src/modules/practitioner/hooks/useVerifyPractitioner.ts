import { usePractitionerService } from "@/services/practitioner/practitioner.service";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
export const useVerifyPractitioner = ({
  onVerifySuccess,
}: {
  onVerifySuccess: () => void;
}) => {
  const [verifiedError, setVerifiedError] = useState(false);
  const { mutate: verifyOtp, isPending: isVerifying } = usePractitionerService()
    .verifyOtp()
    .useMutation({
      onSuccess: (res) => {
        if (res.data.status) {
          setVerifiedError(false);
          onVerifySuccess();
          enqueueSnackbar("Account verified successfully", {
            variant: "success",
          });
        } else {
          setVerifiedError(true);
          enqueueSnackbar("Account verified failed", {
            variant: "error",
          });
        }
      },
      onError: () => {
        setVerifiedError(true);
        enqueueSnackbar("Account verified failed", {
          variant: "error",
        });
      },
    });
  const { mutate: resendOtp, isPending: isResending } = usePractitionerService()
    .resendOtp()
    .useMutation({
      onSuccess: (res) => {
        if (res.data.status) {
          enqueueSnackbar("Code resent successfully", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Code not sent", {
            variant: "error",
          });
        }
      },
      onError: () => {
        enqueueSnackbar("Code not sent", {
          variant: "error",
        });
      },
    });

  return {
    verifyOtp,
    isVerifying,
    resendOtp,
    isResending,
    verifiedError,
    setVerifiedError,
  };
};
