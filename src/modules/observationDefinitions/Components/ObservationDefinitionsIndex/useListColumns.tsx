import { type GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PagesRoutes } from "@/constants/pages-routes";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useObservationDefinitionsService } from "@/services/observationDefinitions/observationDefinitions.service";
import { ObservationDefinitions } from "@/services/observationDefinitions/observationDefinitions.types";
import ActiveToggle from "../ActiveToggle";
/**
 *
 * This hook might look messy so please if you find anything hard to understand check the following link
 * and Everything will be fine
 * @see See {@link https://mui.com/x/react-data-grid/column-definition/ DataGrid column docs} for more details.
 *
 */

export const useListColumns = () => {
  const navigate = useNavigate();

  const handleNavigateToUpdateObservationDefinitions = (id: number) => {
    navigate(
      PagesRoutes.observationDefinitions.children.update.path + `/${id}`
    );
  };

  const handleNavigateToShowObservationDefinitions = (id: number) => {
    navigate(PagesRoutes.observationDefinitions.children.show.path + `/${id}`);
  };

  const invalidate = useObservationDefinitionsService().index().invalidate;

  const columns: GridColDef<ObservationDefinitions>[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "purpose",
      headerName: "Purpose",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell({ row }) {
        return row.type.display;
      },
    },
    {
      field: "classification",
      headerName: "Classification",
      flex: 1,
      renderCell({ row }) {
        return row.classification.display;
      },
    },
    {
      field: "method",
      headerName: "Method",
      flex: 1,
      renderCell({ row }) {
        return row.method.display;
      },
    },
    {
      field: "permitted_unit",
      headerName: "Permitted Unit",
      flex: 1,
      renderCell({ row }) {
        return row.permitted_unit.display;
      },
    },
    {
      field: "body_site",
      headerName: "Body Site",
      flex: 1,
      renderCell({ row }) {
        return row.body_site.display;
      },
    },
    {
      field: "activeToggle",
      headerName: "Active",
      flex: 1,
      renderCell({ row }) {
        return (
          <ActiveToggle
            active={row.status.id == 90 ? 1 : 0}
            id={row.id}
            onSuccess={invalidate}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell({ row }) {
        return (
          <Stack direction={"row"}>
            <IconButton
              onClick={() => handleNavigateToShowObservationDefinitions(row.id)}
            >
              <RemoveRedEyeIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                handleNavigateToUpdateObservationDefinitions(row.id)
              }
            >
              <EditIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return { columns };
};
