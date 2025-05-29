import { type GridColDef } from "@mui/x-data-grid";
import { Clinic } from "@/services/clinics/clinics.types";
import { Box, Stack } from "@mui/material";
/**
 *
 * This hook might look messy so please if you find anything hard to understand check the following link
 * and Everything will be fine
 * @see See {@link https://mui.com/x/react-data-grid/column-definition/ DataGrid column docs} for more details.
 *
 */

export const useListColumns = () => {
  const columns: GridColDef<Clinic>[] = [
    {
      field: "photo",
      headerName: "Photo",
      flex: 1,
      renderCell({ row }) {
        return (
          <Box
            component="img"
            alt="photo"
            src={row?.photo ?? "-"}
            sx={{
              height: 50,
              width: 50,
              objectFit: "cover",
              borderRadius: ".5rem",
            }}
          />
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "active",
      headerName: "Active",
      renderCell({ row }) {
        return row.active ? "yes" : "no";
      },
    },
  ];

  return { columns };
};
