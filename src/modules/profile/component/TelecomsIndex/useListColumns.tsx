import { type GridColDef } from "@mui/x-data-grid";
import { Telecom } from "@/services/telecoms/telecom.types";
import { Box, IconButton, Stack } from "@mui/material";
import DeleteTelecomDialog from "./TelecomDeleteDialog";
import TelecomUpdateDialog from "./TelecomUpdateDialog";
/**
 *
 * This hook might look messy so please if you find anything hard to understand check the following link
 * and Everything will be fine
 * @see See {@link https://mui.com/x/react-data-grid/column-definition/ DataGrid column docs} for more details.
 *
 */

export const useListColumns = () => {
  const columns: GridColDef<Telecom>[] = [
    {
      field: "value",
      headerName: "Value",
      flex: 1,
    },
    {
      field: "rank",
      headerName: "Rank",
      flex: 1,
    },
    {
      field: "start_date",
      headerName: "Start date",
      flex: 1,
    },
    {
      field: "end_date",
      headerName: "End date",
      flex: 1,
      renderCell({ row }) {
        return row?.end_date ?? "-";
      },
    },
    {
      field: "type",
      headerName: "Type",
      renderCell({ row }) {
        return row?.type?.display;
      },
    },
    {
      field: "use",
      headerName: "Use",
      renderCell({ row }) {
        return row?.use?.display;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell({ row: telecom }) {
        return (
          <Stack direction={"row"} alignItems={"center"}>
            <TelecomUpdateDialog telecom={telecom} />
            <DeleteTelecomDialog telecom={telecom} />
          </Stack>
        );
      },
    },
  ];

  return { columns };
};
