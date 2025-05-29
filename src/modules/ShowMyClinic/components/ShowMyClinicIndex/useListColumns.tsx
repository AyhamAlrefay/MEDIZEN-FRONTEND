import { type GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { HealthCare } from "@/services/healthCare/healthCare.types";

/**
 *
 * This hook might look messy so please if you find anything hard to understand check the following link
 * and Everything will be fine
 * @see See {@link https://mui.com/x/react-data-grid/column-definition/ DataGrid column docs} for more details.
 *
 */

export const useListColumns = () => {
  const columns: GridColDef<HealthCare>[] = [
    {
      field: "photo",
      headerName: "Photo",
      flex: 1,
      renderCell({ row }) {
        return (
          <Box
            component="img"
            alt="photo img"
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
      field: "comment",
      headerName: "Comment",
      flex: 1,
    },
    {
      field: "appointmentRequired",
      headerName: "Appointment Required",
      flex: 1,
      renderCell({ row }) {
        return row?.appointmentRequired ? "yes" : "No";
      },
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },

    {
      field: "active",
      headerName: "Active",
      flex: 1,
      renderCell({ row }) {
        return row.active ? "yes" : "no";
      },
    },
  ];

  return { columns };
};
