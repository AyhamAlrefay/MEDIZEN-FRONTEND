import { type GridColDef } from "@mui/x-data-grid";
import { Role } from "@/services/roles/roles.types";
import { Stack, IconButton } from "@mui/material";
import RoleUpdateDialog from "./RoleUpdateDialog";
import RoleDeleteDialog from "./RoleDeleteDialog";
import EyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";

/**
 *
 * This hook might look messy so please if you find anything hard to understand check the following link
 * and Everything will be fine
 * @see See {@link https://mui.com/x/react-data-grid/column-definition/ DataGrid column docs} for more details.
 *
 */

export const useListColumns = () => {
  const navigate = useNavigate();

  const columns: GridColDef<Role>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "guard_name",
      headerName: "Guard Name",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell({ row }) {
        return (
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <IconButton
              color="primary"
              onClick={() => navigate(`/roles/${row.id}/permissions`)}
            >
              <EyeIcon />
            </IconButton>
            <RoleUpdateDialog role={row} />
            <RoleDeleteDialog role={row} />
          </Stack>
        );
      },
    },
  ];

  return { columns };
}; 