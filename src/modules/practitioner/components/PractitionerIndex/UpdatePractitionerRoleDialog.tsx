import { Button, IconButton, Stack } from "@mui/material";
import { StyledDialog } from "@/shared/components/Dialog/Dialog";
import { useDialog } from "@/shared/hooks/useDialog";
import { usePractitionerService } from "@/services/practitioner/practitioner.service";
import { Practitioner } from "@/services/practitioner/practitioner.types";
import { enqueueSnackbar } from "notistack";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { Role } from "@/services/roles/roles.types";
import RolesControlledField from "@/shared/components/common/RolesControlledField";

interface UpdatePractitionerRoleDialogProps {
  practitioner: Practitioner;
}

interface FormData {
  role: Role;
}

function UpdatePractitionerRoleDialog({
  practitioner,
}: UpdatePractitionerRoleDialogProps) {
  const { handleCloseDialog, handleOpenDialog, openDialog } = useDialog();

  const methods = useForm<FormData>({
    defaultValues: {
      role: practitioner.roles?.[0],
    },
  });

  const { mutate, isPending } = usePractitionerService()
    .updateRole()
    .useMutation(practitioner.id ?? 0, {
      onSuccess: (res) => {
        if (res.data.status) {
          enqueueSnackbar({
            message: "Role updated successfully",
            variant: "success",
          });
          handleCloseDialog();
        }
      },
    });

  const onSubmit = methods.handleSubmit((data) => {
    mutate(data.role.id);
  });

  return (
    <>
      <IconButton onClick={handleOpenDialog}>
        <EditIcon />
      </IconButton>
      <StyledDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title="Update Role"
      >
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <RolesControlledField
              controllerProps={{
                control: methods.control,
                name: "role",
              }}
              
            />
            <Stack
              direction="row"
              sx={{
                justifyContent: "flex-end",
                mt: 2,
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
                disabled={isPending}
              >
                save
              </Button>
            </Stack>
          </Stack>
        </form>
      </StyledDialog>
    </>
  );
}

export default UpdatePractitionerRoleDialog;
