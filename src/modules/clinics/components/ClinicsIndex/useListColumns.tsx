import { type GridColDef } from "@mui/x-data-grid";
import { Clinic } from "@/services/clinics/clinics.types";
import { Box, Stack } from "@mui/material";
import ActiveToggle from "./ActiveToggle";
import ClinicUpdateDialog from "./ClinicUpdateDialog";
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
  const { can: isCanActiveToggle } = useCan({
    action:
      SubjectToActions[Subjects.CLINIC_MANAGEMENT][
        Actions.TOGGLE_CLINIC_STATUS
      ],
  });

  const { can: isCanUpdate } = useCan({
    action: SubjectToActions[Subjects.CLINIC_MANAGEMENT][Actions.EDIT_CLINIC],
  });

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
    ...(isCanActiveToggle
      ? [
          {
            field: "activeStatus",
            headerName: "Active",
            renderCell({ row }: { row: Clinic }) {
              return <ActiveToggle active={row.active} id={row.id} />;
            },
          },
        ]
      : []),

    ...(isCanUpdate
      ? [
          {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            renderCell({ row }: { row: Clinic }) {
              return (
                <Stack direction={"row"} alignItems={"center"}>
                  <ClinicUpdateDialog clinic={row} />
                </Stack>
              );
            },
          },
        ]
      : []),
  ];

  return { columns };
};
