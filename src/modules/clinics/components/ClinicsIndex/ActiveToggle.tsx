import { useClinicsService } from "@/services/clinics/clinics.service";
import { useDialog } from "@/shared/hooks/useDialog";
import Switch from "@mui/material/Switch";
import { enqueueSnackbar } from "notistack";
import ToggleConfirmationDialog from "@/shared/components/ToggleConfirmationDialog";

const ActiveToggle = ({ active, id }: { active: number; id: any }) => {
  const { openDialog, handleOpenDialog, handleCloseDialog } = useDialog();
  const invalidate = useClinicsService().index().invalidate;

  const { mutate, isPending } = useClinicsService()
    .toggleActive()
    .useMutation(id, {
      onSuccess(res) {
        if (res.data.status) {
          handleCloseDialog();
          invalidate();
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
        description={`Are you sure you want to change the clinic's activity status to ${!active ? "Active" : "Inactive"}?`}
        title="Activate clinic!"
        onClose={handleCloseDialog}
        onSubmit={handleChangeStateClick}
        loading={isPending}
      />
    </>
  );
};

export default ActiveToggle;
