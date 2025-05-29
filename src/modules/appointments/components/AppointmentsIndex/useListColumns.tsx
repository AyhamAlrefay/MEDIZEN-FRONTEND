import { type GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PagesRoutes } from "@/constants/pages-routes";
import { Appointments } from "@/services/appointments/appointments.types";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useCan } from "@/can/useCan";
import { Actions, Subjects, SubjectToActions } from "@/can/permissions";
import CancelToggle from "../CancelToggle";
import FinishToggle from "../FinishToggle";
import { useAppointmentsService } from "@/services/appointments/appointments.service";
import { Can } from "@/can/Can";
import AppointmentUpdateDialog from "../AppointmentUpdate/AppointmentUpdateDialog";
/**
 *
 * This hook might look messy so please if you find anything hard to understand check the following link
 * and Everything will be fine
 * @see See {@link https://mui.com/x/react-data-grid/column-definition/ DataGrid column docs} for more details.
 *
 */

export const useListColumns = () => {
  const navigate = useNavigate();
  const invalidate = useAppointmentsService().index().invalidate();

  const handleNavigateToShowAppointments = (id: number) => {
    navigate(PagesRoutes.appointments.children.show.path + `/${id}`);
  };

  const { can: isCanCancelToggle } = useCan({
    action:
      SubjectToActions[Subjects.APPOINTMENT_MANAGEMENT][
        Actions.CANCEL_APPOINTMENT
      ],
  });

  const { can: isCanFinishToggle } = useCan({
    action:
      SubjectToActions[Subjects.APPOINTMENT_MANAGEMENT][
        Actions.FINISH_APPOINTMENT
      ],
  });

  const columns: GridColDef<Appointments>[] = [
    {
      field: "reason",
      headerName: "Reason",
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
      field: "start_date",
      headerName: "start_date",
      flex: 1,
    },
    {
      field: "end_date",
      headerName: "End Data",
      flex: 1,
    },
    {
      field: "patient",
      headerName: "Patient",
      flex: 1,
      renderCell({ row }) {
        const patient = row.patient;
        return `${patient.f_name} ${patient.l_name}`;
      },
    },
    {
      field: "doctor",
      headerName: "Doctor",
      flex: 1,
      renderCell({ row }) {
        const doctor = row.doctor;
        return `${doctor.f_name} ${doctor.l_name}`;
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell({ row }) {
        return row.status?.display;
      },
    },
    ...(isCanCancelToggle
      ? [
          {
            field: "cancelToggle",
            headerName: "Cancel Status",
            flex: 1,
            renderCell({ row }: { row: Appointments }) {
              return (
                <CancelToggle
                  isCanceled={row.status.id == 82}
                  onSuccess={invalidate}
                  id={row?.id}
                />
              );
            },
          },
        ]
      : []),
    ...(isCanFinishToggle
      ? [
          {
            field: "FinishToggle",
            headerName: "Finish Status",
            flex: 1,
            renderCell({ row }: { row: Appointments }) {
              return (
                <FinishToggle
                  isFinished={row.status.id == 83}
                  onSuccess={invalidate}
                  id={row?.id}
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
            <IconButton
              color="primary"
              onClick={() => handleNavigateToShowAppointments(row.id)}
            >
              <RemoveRedEyeIcon />
            </IconButton>
            <Can
              action={
                SubjectToActions[Subjects.APPOINTMENT_MANAGEMENT][
                  Actions.UPDATE_APPOINTMENT
                ]
              }
            >
              <AppointmentUpdateDialog
                onSuccess={invalidate}
                appointment={row}
              />
            </Can>
          </Stack>
        );
      },
    },
  ];

  return { columns };
};
