import { useDialog } from "@/shared/hooks/useDialog";
import Switch from "@mui/material/Switch";
import { enqueueSnackbar } from "notistack";
import ToggleConfirmationDialog from "@/shared/components/ToggleConfirmationDialog";
import { useObservationDefinitionsService } from "@/services/observationDefinitions/observationDefinitions.service";

const ActiveToggle = ({
  active,
  id,
  onSuccess,
}: {
  active: number;
  id: any;
  onSuccess: any;
}) => {
  const { openDialog, handleOpenDialog, handleCloseDialog } = useDialog();

  const { mutate, isPending } = useObservationDefinitionsService()
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
        description={`Are you sure you want to change the Observation Definition activity status to ${
          !active ? "Active" : "Inactive"
        }?`}
        title="Change Observation Definition activity status!"
        onClose={handleCloseDialog}
        onSubmit={handleChangeStateClick}
        loading={isPending}
      />
    </>
  );
};

export default ActiveToggle;
