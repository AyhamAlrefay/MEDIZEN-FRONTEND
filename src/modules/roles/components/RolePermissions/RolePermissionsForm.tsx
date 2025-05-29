import { useRolesService } from "@/services/roles/roles.service";
import { GroupWithPermissions, Permission, Role } from "@/services/roles/roles.types";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
interface FormData {
  permissions: number[];
}

interface GroupedPermissions {
  [key: string]: Permission[];
}

interface RolePermissionsFormProps {
  role: Role;
  permissionsGroups: GroupWithPermissions[];
}
function RolePermissionsForm({ role, permissionsGroups }: RolePermissionsFormProps) {
  const navigate = useNavigate();

  const methods = useForm<FormData>({
    defaultValues: {
      permissions: role.permissions.map((p) => p.id),
    },
  });

  const { mutate: assignPermissions, isPending } = useRolesService()
    .assignPermissions()
    .useMutation(Number(role.id), {
      onSuccess: () => {
        enqueueSnackbar("Permissions updated successfully", {
          variant: "success",
        });
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          enqueueSnackbar(error.message, { variant: "error" });
        } else {
          enqueueSnackbar("An error occurred", { variant: "error" });
        }
      },
    });

  const onSubmit = methods.handleSubmit((data) => {
    assignPermissions(data.permissions);
  });

  
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {permissionsGroups?.map((group) => (
          <Grid item key={group.id} xs={12} sm={6} md={4} lg={3}>
            <Typography
              variant="subtitle1"
              sx={{ mb: 2, textTransform: "capitalize" }}
            >
              {group.display}
            </Typography>
            <Stack spacing={1}>
              {group?.permissions.map((permission: Permission) => (
                <FormControlLabel
                  key={permission.id}
                  control={
                    <Checkbox
                      checked={methods
                        .watch("permissions")
                        .includes(permission.id)}
                      onChange={(e) => {
                        const currentPermissions =
                          methods.getValues("permissions");
                        if (e.target.checked) {
                          methods.setValue("permissions", [
                            ...currentPermissions,
                            permission.id,
                          ]);
                        } else {
                          methods.setValue(
                            "permissions",
                            currentPermissions.filter(
                              (id) => id !== permission.id,
                            ),
                          );
                        }
                      }}
                    />
                  }
                  label={permission.name}
                />
              ))}
            </Stack>
          </Grid>
        ))}
      </Grid>
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
          onClick={() => navigate(-1)}
          sx={{ paddingX: 7, paddingY: 1 }}
          variant="outlined"
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
    </form>
  );
}

export default RolePermissionsForm;
