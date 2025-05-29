import { useHealthCareService } from "@/services/healthCare/healthCare.service";
import { useDialog } from "@/shared/hooks/useDialog";
import Switch from "@mui/material/Switch";
import { enqueueSnackbar } from "notistack";
import ToggleConfirmationDialog from "../../../shared/components/ToggleConfirmationDialog";

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
  const { mutate, isPending } = useHealthCareService()
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
        description={` Are you sure you want to change the health care service activity status to  ${!active ? "Active" : "Inactive"}?`}
        title="Change health care service activity status!"
        onClose={handleCloseDialog}
        onSubmit={handleChangeStateClick}
        loading={isPending}
      />
    </>
  );
};

export default ActiveToggle;
