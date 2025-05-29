import { type GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { PagesRoutes } from "@/constants/pages-routes";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { QualifiedValues } from "@/services/qualifiedValues/qualifiedValues.types";
import QualifiedValuesDeleteDialog from "./QualifiedValuesDeleteDialog";

/**
 *
 * This hook might look messy so please if you find anything hard to understand check the following link
 * and Everything will be fine
 * @see See {@link https://mui.com/x/react-data-grid/column-definition/ DataGrid column docs} for more details.
 *
 */

export const useListColumns = () => {
  const navigate = useNavigate();
  const { id: observationId } = useParams<{ id: string }>();

  const handleNavigateToUpdateQualifiedValues = (id: number) => {
    const path = `${PagesRoutes.observationDefinitions.path}/${observationId}${PagesRoutes.observationDefinitions.children.updateAualifiedValues.path}/${id}`;
    navigate(path);
  };

  const columns: GridColDef<QualifiedValues>[] = [
    {
      field: "age_range",
      headerName: "Age Range",
      flex: 1,
      renderCell({ row }) {
        return (
          <Stack direction="column" spacing={0.5}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <ArrowUpwardIcon fontSize="small" color="secondary" />
              <span>
                {row.age_range.high.value} {row.age_range.high.unit}
              </span>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <ArrowDownwardIcon fontSize="small" color="primary" />
              <span>
                {row.age_range.low.value} {row.age_range.low.unit}
              </span>
            </Stack>
          </Stack>
        );
      },
    },
    {
      field: "value_range",
      headerName: "Value Range",
      flex: 1,
      renderCell({ row }) {
        return (
          <Stack direction="column" spacing={0.5}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <ArrowUpwardIcon fontSize="small" color="error" />
              <span>
                {row.value_range.high.value} {row.value_range.high.unit}
              </span>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <ArrowDownwardIcon fontSize="small" color="success" />
              <span>
                {row.value_range.low.value} {row.value_range.low.unit}
              </span>
            </Stack>
          </Stack>
        );
      },
    },
    {
      field: "context",
      headerName: "Context",
      flex: 1,
      renderCell({ row }) {
        return row.context.display;
      },
    },
    {
      field: "applies_to",
      headerName: "Applies To",
      flex: 1,
      renderCell({ row }) {
        return row.applies_to.display;
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      renderCell({ row }) {
        return row.gender.display;
      },
    },
    {
      field: "range_category",
      headerName: "Range Category",
      flex: 1,
      renderCell({ row }) {
        return row.range_category.display;
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      renderCell({ row }) {
        return (
          <Stack direction={"row"}>
            <IconButton
              onClick={() => handleNavigateToUpdateQualifiedValues(row.id)}
            >
              <EditIcon />
            </IconButton>
            <QualifiedValuesDeleteDialog qualifiedValues={row} />
          </Stack>
        );
      },
    },
  ];

  return { columns };
};
