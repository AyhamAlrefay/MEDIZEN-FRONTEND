import { usePatientService } from "@/services/patients/patients.service";
import { useDialog } from "@/shared/hooks/useDialog";
import Switch from "@mui/material/Switch";
import { enqueueSnackbar } from "notistack";
import ToggleConfirmationDialog from "../../../shared/components/ToggleConfirmationDialog";

const DeceasedToggle = ({
  deceased,
  id,
  onSuccess,
}: {
  deceased: string | null | undefined;
  id: any;
  onSuccess: any;
}) => {
  const { openDialog, handleOpenDialog, handleCloseDialog } = useDialog();

  const { mutate, isPending } = usePatientService()
    .toggleDeceased()
    .useMutation(id, {
      onSuccess(res) {
        if (res.data.status) {
          handleCloseDialog();
          onSuccess();
        } else {
          enqueueSnackbar({
            message: "toggle deceased failed",
            variant: "error",
          });
        }
      },
    });

  const handleChangeStateClick = () => {
    mutate({});
  };
  return (
    <>
      <Switch
        defaultChecked={!!deceased}
        onChange={handleOpenDialog}
        checked={!!deceased}
      />
      <ToggleConfirmationDialog
        open={openDialog}
        description={`Are you sure you want to change the patient's status to ${!deceased ? "Deceased" : "Alive"}?`}
        title="Change patient status to Deceased!"
        onClose={handleCloseDialog}
        onSubmit={handleChangeStateClick}
        loading={isPending}
      />
    </>
  );
};

export default DeceasedToggle;
