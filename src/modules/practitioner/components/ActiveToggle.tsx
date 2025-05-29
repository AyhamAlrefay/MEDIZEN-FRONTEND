import { usePractitionerService } from "@/services/practitioner/practitioner.service";
import { useDialog } from "@/shared/hooks/useDialog";
import Switch from "@mui/material/Switch";
import { enqueueSnackbar } from "notistack";
import ToggleConfirmationDialog from "../../../shared/components/ToggleConfirmationDialog";

const ActiveToggle = ({
  active,
  id,
  onSuccess,
}: {
  active: number | undefined;
  id: any;
  onSuccess: any;
}) => {
  const { openDialog, handleOpenDialog, handleCloseDialog } = useDialog();
  const { mutate, isPending } = usePractitionerService()
    .toggleActive()
    .useMutation(id, {
      onSuccess(res) {
        if (res.data.status) {
          handleCloseDialog();
          onSuccess();
        } else {
          enqueueSnackbar({
            message: "toggle active failed",
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
        defaultChecked={!!active}
        onChange={handleOpenDialog}
        checked={!!active}
      />
      <ToggleConfirmationDialog
        open={openDialog}
        description={`Are you sure you want to change the practitioner's activity status to ${!active ? "Active" : "Inactive"}?`}
        title="Change practitioner activity status!"
        onClose={handleCloseDialog}
        onSubmit={handleChangeStateClick}
        loading={isPending}
      />
    </>
  );
};

export default ActiveToggle;
