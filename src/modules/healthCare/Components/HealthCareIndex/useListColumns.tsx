import { type GridColDef } from "@mui/x-data-grid";
import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PagesRoutes } from "@/constants/pages-routes";
import EditIcon from "@mui/icons-material/Edit";
import { useHealthCareService } from "@/services/healthCare/healthCare.service";
import { HealthCare } from "@/services/healthCare/healthCare.types";
import ActiveToggle from "../ActiveToggle";
import { Code } from "@/services/codes/codes.types";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Can } from "@/can/Can";
import { SubjectToActions, Subjects, Actions } from "@/can/permissions";
import { useCan } from "@/can/useCan";

/**
 *
 * This hook might look messy so please if you find anything hard to understand check the following link
 * and Everything will be fine
 * @see See {@link https://mui.com/x/react-data-grid/column-definition/ DataGrid column docs} for more details.
 *
 */

export const useListColumns = () => {
  const navigate = useNavigate();

  const handleNavigateToUpdateHealthCare = (id: number) => {
    navigate(PagesRoutes.healthCare.children.update.path + `/${id}`);
  };

  const handleNavigateToShowHealthCare = (id: number) => {
    navigate(PagesRoutes.healthCare.children.show.path + `/${id}`);
  };

  const invalidate = useHealthCareService().index().invalidate;

  const { can: isCanActiveToggle } = useCan({
    action:
      SubjectToActions[Subjects.HEALTHCARE_SERVICE_MANAGEMENT][
        Actions.TOGGLE_HEALTH_CARE_SERVICE_STATUS
      ],
  });

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
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell({ row }) {
        return row?.category.display;
      },
    },
    {
      field: "clinic",
      headerName: "Clinic",
      flex: 1,
      renderCell({ row }) {
        return row.clinic.name;
      },
    },
    {
      field: "eligibilities",
      headerName: "Eligibilities",
      flex: 1,
      renderCell({ row }) {
        return (
          <Stack direction={"row"} flexWrap="wrap" rowGap={1}>
            {row.eligibilities.map((item: Code, index: number) => (
              <Chip key={index} label={item.display} variant="outlined" />
            ))}
          </Stack>
        );
      },
    },
    ...(isCanActiveToggle
      ? [
          {
            field: "activeStatus",
            headerName: "Active",
            flex: 1,
            renderCell({ row }: { row: HealthCare }) {
              return (
                <ActiveToggle
                  active={row.active}
                  id={row.id}
                  onSuccess={invalidate}
                />
              );
            },
          },
        ]
      : []),

    {
      field: "actions",
      headerName: "Actions",
      renderCell({ row }) {
        return (
          <Stack direction={"row"}>
            <IconButton onClick={() => handleNavigateToShowHealthCare(row.id)}>
              <RemoveRedEyeIcon />
            </IconButton>
            <Can
              action={
                SubjectToActions[Subjects.HEALTHCARE_SERVICE_MANAGEMENT][
                  Actions.EDIT_HEALTH_CARE_SERVICE
                ]
              }
            >
              <IconButton
                onClick={() => handleNavigateToUpdateHealthCare(row.id)}
              >
                <EditIcon />
              </IconButton>
            </Can>
          </Stack>
        );
      },
    },
  ];

  return { columns };
};
