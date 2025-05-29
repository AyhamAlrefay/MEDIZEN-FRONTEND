import { Qualification } from "@/services/user/user.types";
import { Box, IconButton } from "@mui/material";
import { type GridColDef } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { StorageMainUrl } from "@/constants";
/**
 *
 * This hook might look messy so please if you find anything hard to understand check the following link
 * and Everything will be fine
 * @see See {@link https://mui.com/x/react-data-grid/column-definition/ DataGrid column docs} for more details.
 *
 */

export const useListColumns = () => {
  const columns: GridColDef<Qualification>[] = [
    {
      field: "issuer",
      headerName: "Issuer",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell({ row: qualification }) {
        return qualification?.type?.display;
      },
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
    },

    {
      field: "Action",
      headerName: "Pdf",
      sortable: false,
      renderCell({ row: qualification }) {
        return (
          <Box>
            <IconButton
              disabled={!qualification?.pdf}
              component="a"
              target="_blank"
              download
              href={StorageMainUrl + qualification?.pdf}
            >
              <FileDownloadIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return { columns };
};
