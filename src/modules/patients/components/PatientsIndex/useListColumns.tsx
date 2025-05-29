import { type GridColDef } from "@mui/x-data-grid";
import { Box, IconButton, Stack } from "@mui/material";
import { Patient } from "@/services/patients/patients.types";
import { useNavigate } from "react-router-dom";
import { PagesRoutes } from "@/constants/pages-routes";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeceasedToggle from "../DeceasedToggle";
import ActiveToggle from "../ActiveToggle";
import EditIcon from "@mui/icons-material/Edit";
import { usePatientService } from "@/services/patients/patients.service";
import { useCan } from "@/can/useCan";
import { Actions, Subjects, SubjectToActions } from "@/can/permissions";
/**
 *
 * This hook might look messy so please if you find anything hard to understand check the following link
 * and Everything will be fine
 * @see See {@link https://mui.com/x/react-data-grid/column-definition/ DataGrid column docs} for more details.
 *
 */

export const useListColumns = () => {
  const navigate = useNavigate();
  const invalidate = usePatientService().index().invalidate;

  const handleNavigateToUpdatePatient = (id: number) => {
    navigate(PagesRoutes.patients.children.update.path + `/${id}`);
  };

  const { can: isCanActiveToggle } = useCan({
    action:
      SubjectToActions[Subjects.PATIENT_MANAGEMENT][
        Actions.TOGGLE_PATIENT_STATUS
      ],
  });

  const { can: isCanDeceasedToggle } = useCan({
    action:
      SubjectToActions[Subjects.PATIENT_MANAGEMENT][
        Actions.TOGGLE_PATIENT_DECEASED_STATUS
      ],
  });

  const columns: GridColDef<Patient>[] = [
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 1,
      renderCell({ row }) {
        return (
          <Box
            component="img"
            alt="avatar img"
            src={row?.avatar ?? "-"}
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
      field: "f_name",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "l_name",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "date_of_birth",
      headerName: "Date of Birth",
      flex: 1,
    },
    {
      field: "deceased_date",
      headerName: "Deceased Date",
      flex: 1,
      renderCell({ row }) {
        return row?.deceased_date ?? "-";
      },
    },

    ...(isCanActiveToggle
      ? [
          {
            field: "activeStatus",
            headerName: "Active",
            flex: 1,
            renderCell({ row }: { row: Patient }) {
              return (
                <ActiveToggle
                  onSuccess={invalidate}
                  active={row.active}
                  id={row.id}
                />
              );
            },
          },
        ]
      : []),
    ...(isCanDeceasedToggle
      ? [
          {
            field: "deceasedStatus",
            headerName: "Deceased",
            flex: 1,
            renderCell({ row }: { row: Patient }) {
              return (
                <DeceasedToggle
                  onSuccess={invalidate}
                  deceased={row.deceased_date}
                  id={row.id}
                />
              );
            },
          },
        ]
      : []),
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      renderCell({ row }) {
        return row?.gender?.display;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell({ row }) {
        return (
          <Stack direction={"row"}>
            <Box>
              <IconButton
                color="primary"
                onClick={() =>
                  navigate(
                    PagesRoutes.patients.children.show.path + "/" + row.id
                  )
                }
              >
                <RemoveRedEyeIcon />
              </IconButton>
            </Box>
            <IconButton onClick={() => handleNavigateToUpdatePatient(row.id)}>
              <EditIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return { columns };
};
