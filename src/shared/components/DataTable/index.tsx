import { CustomPagination } from "@/shared/components/DataTable/CustomPagination";
import { Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  type GridPaginationModel,
  type GridColDef,
  type GridSortModel,
  type GridEventListener,
} from "@mui/x-data-grid";
import { useSearchParams } from "react-router-dom";

interface IProps {
  columns: GridColDef[];
  rows: unknown[];
  rowCount?: number;
  paginationModel?: GridPaginationModel;
  sortModel?: GridSortModel;
  onPaginationModelChange?: (model: GridPaginationModel) => void;
  onSortModelChange?: (model: GridSortModel) => void;
  onRowClick?: GridEventListener<"rowClick">;
  searchInputProps?: {
    placeHolder: string;
  };
  onSearch?: (v: string) => void;

  rowHeight?: number;
  hideFooter?: boolean;
  hideToolbar?: boolean;
  loading?: boolean;
  paginationMode?: "server" | "client";
  sortingMode?: "server" | "client";
  filterComponent?: React.ReactNode;
  withoutSearchFilter?: boolean;
}

const TABLE_PAGE_SIZE = 10;

export function DataTable({
  columns,
  rows,
  rowCount,
  paginationModel,
  onPaginationModelChange,
  sortModel,
  onSortModelChange,
  rowHeight,
  onRowClick,
  hideFooter,
  loading = false,
  onSearch,
  paginationMode = "server",
  sortingMode = "client",
  filterComponent,
  withoutSearchFilter = false,
}: IProps): JSX.Element {
  const [searchParams] = useSearchParams();
  const defaultSearchValue = JSON.parse(
    searchParams.get("filter") ?? "{}",
  )?.search;
  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "flex-end" }}
        justifyContent={"space-between"}
        px={2}
        pt={1}
        pb={1}
        columnGap={5}
        rowGap={1}
        width={"100%"}
      >
        <Box>{filterComponent}</Box>
        {!withoutSearchFilter && (
          <TextField
            label="Search"
            variant="standard"
            onChange={(e) => onSearch?.(e.target.value)}
            defaultValue={defaultSearchValue}
            sx={{ marginInlineStart: { xs: 0, md: "auto" } }}
          />
        )}
      </Stack>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <DataGrid
          autoHeight
          sx={{
            bgcolor: "white",
            borderRadius: "20px",
            border: 0,
            "& .MuiDataGrid-columnHeaderTitle": {
              userSelect: "none",
              textTransform: "capitalize",
              fontWeight: 600,
              fontSize: 16,
              color: "#6f6f6f",
            },
            "& .MuiDataGrid-cell ": {
              py: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            },
            "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
              {
                outline: "none",
              },
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
            "& .MuiDataGrid-columnHeader ": {
              outline: "none !important",
            },

            "& .MuiDataGrid-virtualScroller , & .MuiDataGrid-overlayWrapperInner":
              {
                // minHeight: 500,
              },
          }}
          rows={rows}
          columns={columns.map((column) => ({ ...column, minWidth: 150 }))}
          loading={loading}
          getRowHeight={() => rowHeight ?? "auto"}
          pageSizeOptions={[10, 20, 30]}
          paginationMode={paginationMode}
          sortingMode={sortingMode}
          rowCount={rowCount ?? TABLE_PAGE_SIZE}
          disableRowSelectionOnClick
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => onPaginationModelChange?.(model)}
          sortModel={sortModel}
          onSortModelChange={(model) => onSortModelChange?.(model)}
          onRowClick={onRowClick}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: paginationModel?.pageSize ?? TABLE_PAGE_SIZE,
                page: paginationModel?.page ?? 0,
              },
            },
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          hideFooter={hideFooter}
          slots={{
            pagination: CustomPagination,
          }}
        />
      </Box>
    </Box>
  );
}
