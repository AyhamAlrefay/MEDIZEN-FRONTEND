import { Box, Stack, Typography } from "@mui/material";
import defaultImage from "@/assets/person.png";
import { Appointments } from "@/services/appointments/appointments.types";
import { Practitioner } from "@/services/practitioner/practitioner.types";
import { Patient } from "@/services/patients/patients.types";
import CancelToggle from "../CancelToggle";
import FinishToggle from "../FinishToggle";
import { Link } from "react-router-dom";
import { Actions, Subjects, SubjectToActions } from "@/can/permissions";
import { Can } from "@/can/Can";
import { useAppointmentsService } from "@/services/appointments/appointments.service";
import EditIcon from "@mui/icons-material/Edit";
import { PagesRoutes } from "@/constants";
import AppointmentUpdateDialog from "../AppointmentUpdate/AppointmentUpdateDialog";
const DisplayBox = ({ value, label }: { value: any; label: string }) => {
  return value ? (
    <Stack direction="row" alignItems="start" minWidth={400}>
      <Typography minWidth={130} variant="subtitle1" color="primary">
        {label} :
      </Typography>
      <Typography variant="body1" maxWidth={270} color="text.darkGray">
        {value}
      </Typography>
    </Stack>
  ) : null;
};

interface AppointmentDetailsProps {
  data: Appointments;
}

export const AppointmentDetails = (props: AppointmentDetailsProps) => {
  const { data } = props;

  const patient = data?.patient;
  const doctor = data?.doctor;

  const renderFullName = (item?: Practitioner | Patient) => {
    return `${item?.prefix ?? ""} ${item?.f_name ?? ""} ${item?.l_name ?? ""} ${
      item?.suffix ?? ""
    }`;
  };

  const invalidate = useAppointmentsService().indexOne().invalidate;
  return (
    <Stack gap="16px">
      <Box
        sx={{
          borderRadius: 6,
          p: "28px 26px",
          bgcolor: "white",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" color="primary">
            Appointment Details
          </Typography>
          <Can
            action={
              SubjectToActions[Subjects.APPOINTMENT_MANAGEMENT][
                Actions.UPDATE_APPOINTMENT
              ]
            }
          >
            <AppointmentUpdateDialog
              onSuccess={() => data?.id && invalidate(data?.id)}
              appointment={data}
            />
          </Can>
        </Stack>
        <Stack
          direction="row"
          sx={{
            gap: "2rem",
            mt: 4,
            textTransform: "capitalize",
            flexWrap: "wrap",
          }}
        >
          <Stack
            direction={"row"}
            rowGap="1.25rem"
            mb="2.5rem"
            flexWrap={"wrap"}
          >
            <DisplayBox label={"Reason"} value={data?.reason} />
            <DisplayBox label={"Description"} value={data?.description} />
            <DisplayBox
              label={"Minutes Duration"}
              value={data?.minutes_duration}
            />
          </Stack>
          <Stack
            direction={"row"}
            rowGap="1.25rem"
            mb="2.5rem"
            flexWrap={"wrap"}
          >
            <DisplayBox label={"Start Date"} value={data?.start_date} />
            <DisplayBox label={"Etart Date"} value={data?.end_date} />
            <DisplayBox label={"Note"} value={data?.note} />
          </Stack>
          <Stack
            direction={"row"}
            rowGap="1.25rem"
            mb="2.5rem"
            flexWrap={"wrap"}
          >
            <DisplayBox label={"Type"} value={data?.type.display} />
            <DisplayBox label={"Status"} value={data?.status.display} />
            <DisplayBox
              label={"Previous Appointment"}
              value={data?.previous_appointment}
            />
          </Stack>
          <Stack
            direction={"row"}
            rowGap="1.25rem"
            mb="2.5rem"
            flexWrap={"wrap"}
          >
            <DisplayBox
              label={"Cancellation Date"}
              value={data?.cancellation_date}
            />
            <DisplayBox
              label={"Cancellation Reason"}
              value={data?.cancellation_reason}
            />

            <DisplayBox
              label={"Created By Practitioner"}
              value={
                data?.created_by_practitioner
                  ? renderFullName(data?.created_by_practitioner)
                  : "-"
              }
            />
          </Stack>
        </Stack>
      </Box>
      <Can
        action={
          SubjectToActions[Subjects.APPOINTMENT_MANAGEMENT][
            Actions.CANCEL_APPOINTMENT
          ] &&
          SubjectToActions[Subjects.APPOINTMENT_MANAGEMENT][
            Actions.FINISH_APPOINTMENT
          ]
        }
      >
        <Box
          sx={{
            borderRadius: 6,
            p: "28px 26px",
            bgcolor: "white",
          }}
        >
          <Typography variant="h6" color="primary">
            Appointment Status
          </Typography>
          <Stack mt={1} direction={"row"} gap={4} flexWrap={"wrap"}>
            <Can
              action={
                SubjectToActions[Subjects.APPOINTMENT_MANAGEMENT][
                  Actions.CANCEL_APPOINTMENT
                ]
              }
            >
              <CancelToggle
                onSuccess={() => data?.id && invalidate(data?.id)}
                isCanceled={data?.status.id == 82}
                id={data?.id}
              />
            </Can>
            <Can
              action={
                SubjectToActions[Subjects.APPOINTMENT_MANAGEMENT][
                  Actions.FINISH_APPOINTMENT
                ]
              }
            >
              <FinishToggle
                onSuccess={() => data?.id && invalidate(data?.id)}
                isFinished={data?.status.id == 83}
                id={data?.id}
              />
            </Can>
          </Stack>
        </Box>
      </Can>
      <Box
        sx={{
          borderRadius: 6,
          p: "28px 26px",
          bgcolor: "white",
        }}
      >
        <Typography variant="h6" color="primary">
          Doctor
        </Typography>
        <Stack mt={1} columnGap={3} direction={"row"} alignItems={"center"}>
          <Box
            component="img"
            alt="doctor img"
            src={doctor?.avatar ?? defaultImage}
            sx={{
              height: 110,
              width: 110,
              objectFit: "cover",
              borderRadius: ".5rem",
            }}
          />
          <Stack direction={"row"}>
            <Stack spacing={1}>
              <DisplayBox
                label={"Full Name"}
                value={renderFullName(data?.doctor)}
              />
              <DisplayBox label={"Text"} value={doctor?.text} />
              <DisplayBox label={"Address"} value={doctor?.address} />
            </Stack>
            <Stack spacing={1}>
              <DisplayBox
                label={"date_of_birth"}
                value={doctor?.date_of_birth}
              />
              <DisplayBox
                label={"deceased_date"}
                value={doctor?.deceased_date ?? "_"}
              />
              <DisplayBox
                label={"active"}
                value={doctor?.active ? "yes" : "no"}
              />
            </Stack>
            <Stack spacing={1}>
              <DisplayBox label={"email"} value={doctor?.email} />
              <DisplayBox
                label={"email_verified_at"}
                value={doctor?.email_verified_at}
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          borderRadius: 6,
          p: "28px 26px",
          bgcolor: "white",
        }}
      >
        <Typography variant="h6" color="primary">
          Patient
        </Typography>
        <Stack mt={1} columnGap={3} direction={"row"} alignItems={"center"}>
          <Box
            component="img"
            alt="doctor img"
            src={patient?.avatar ?? defaultImage}
            sx={{
              height: 110,
              width: 110,
              objectFit: "cover",
              borderRadius: ".5rem",
            }}
          />
          <Stack direction={"row"}>
            <Stack spacing={1}>
              <DisplayBox
                label={"Full Name"}
                value={renderFullName(data?.patient)}
              />
              <DisplayBox label={"Text"} value={patient?.text} />
            </Stack>
            <Stack spacing={1}>
              <DisplayBox
                label={"date_of_birth"}
                value={patient?.date_of_birth}
              />
              <DisplayBox
                label={"active"}
                value={patient?.active ? "yes" : "no"}
              />
            </Stack>
            <Stack spacing={1}>
              <DisplayBox label={"email"} value={patient?.email} />
              <DisplayBox
                label={"deceased_date"}
                value={patient?.deceased_date ?? "_"}
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
