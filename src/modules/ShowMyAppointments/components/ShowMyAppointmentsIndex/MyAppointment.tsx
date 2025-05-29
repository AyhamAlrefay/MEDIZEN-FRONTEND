import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  AccessTime,
  Person,
  Label,
  PendingActions,
  CalendarToday,
  EventNote,
  CheckCircle,
} from "@mui/icons-material";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { Appointments } from "@/services/appointments/appointments.types"; // غير حسب مكانك
import { useDialog } from "@/shared/hooks/useDialog";
import ViewDetails from "./ShowDetails";
import FinishedAppointmentDialog from "./FinishedAppointmentDialog";
type Props = {
  appointments: Appointments[];
};

const getColor = (statusCode: number) => {
  switch (statusCode) {
    case 86:
      return "#ff9800";
    case 84:
      return "#4caf50";
    case 85:
      return "#f44336";
    default:
      return "#9e9e9e";
  }
};

const MyAppointments = ({ appointments }: Props) => {
  const { handleCloseDialog, handleOpenDialog, openDialog } = useDialog();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState<number>();
  const [selectedStatus, setSelectedStatus] = useState<number>();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointments>(
    appointments[0]
  );

  const filteredAppointments = appointments?.filter((appointment) => {
    const sameDate =
      !selectedDate ||
      format(parseISO(appointment.start_date), "yyyy-MM-dd") === selectedDate;

    const sameType = !selectedType || appointment.type.id === selectedType;

    const sameStatus =
      !selectedStatus || appointment.status.id === selectedStatus;

    return sameDate && sameType && sameStatus;
  });

  return (
    <Box
      p={4}
      sx={{
        borderRadius: 6,
        p: "28px 26px",
        bgcolor: "white",
      }}
    >
      <Grid container spacing={3} mb={4} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h5" color={"primary"} textAlign="center">
            My Appointments
          </Typography>
        </Grid>

        <Grid item>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, minWidth: 220 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <CalendarToday fontSize="small" color="action" />
              <Typography variant="subtitle2">Date Appointment</Typography>
            </Box>
            <TextField
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Paper>
        </Grid>

        <Grid item>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, minWidth: 220 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <EventNote fontSize="small" color="action" />
              <Typography variant="subtitle2">Appointment Type</Typography>
            </Box>
            <FormControl fullWidth size="small">
              <InputLabel>Appointment Type</InputLabel>
              <Select
                value={selectedType}
                label="Appointment Type"
                onChange={(e) => setSelectedType(Number(e.target.value))}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value={86}>Wating</MenuItem>
                <MenuItem value={85}>Emergency</MenuItem>
                <MenuItem value={84}>Predefined</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        <Grid item>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, minWidth: 220 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <CheckCircle fontSize="small" color="action" />
              <Typography variant="subtitle2">Appointment Status</Typography>
            </Box>
            <FormControl fullWidth size="small">
              <InputLabel>Appointment Status</InputLabel>
              <Select
                value={selectedStatus}
                label="Appointment Status"
                onChange={(e) => setSelectedStatus(Number(e.target.value))}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value={81}>Booked Appointment</MenuItem>
                <MenuItem value={82}>Canceled Appointment</MenuItem>
                <MenuItem value={83}>Finished Appointment</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>

      {/* Appointments */}
      <Grid container spacing={2}>
        {filteredAppointments?.map((appointment) => (
          <Grid item xs={12} md={6} lg={4} key={appointment.id}>
            <Paper
              sx={{
                p: 2,
                borderLeft: `5px solid ${getColor(appointment.type?.id)}`,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                <AccessTime
                  color="primary"
                  fontSize="medium"
                  sx={{ mr: 1, verticalAlign: "middle" }}
                />
                {format(parseISO(appointment.start_date), "dd MMM, hh:mm a")} -{" "}
                {format(parseISO(appointment.end_date), "hh:mm a")}
              </Typography>
              <Typography>
                <Person
                  color="primary"
                  fontSize="medium"
                  sx={{ mr: 1, verticalAlign: "middle" }}
                />
                Patient: {appointment.patient.f_name}{" "}
                {appointment.patient.l_name}
              </Typography>
              <Typography>
                <Label
                  color="primary"
                  fontSize="medium"
                  sx={{ mr: 1, verticalAlign: "middle" }}
                />
                Status: {appointment.status.display}
              </Typography>
              <Typography>
                <PendingActions
                  fontSize="medium"
                  color="primary"
                  sx={{ mr: 1, verticalAlign: "middle" }}
                />
                Type: {appointment.type.display}
              </Typography>
              <Stack direction={"row"} columnGap={2} mt={1}>
                <Button
                  fullWidth
                  startIcon={<RemoveRedEyeIcon />}
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    handleOpenDialog();
                  }}
                >
                  View Details
                </Button>
                <FinishedAppointmentDialog
                  disabled={appointment?.status?.id !== 81}
                  id={appointment.id}
                />
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {filteredAppointments.length == 0 && (
        <Typography variant="h6" color="error" p={3}>
          There are no appointments
        </Typography>
      )}
      <ViewDetails
        appointment={selectedAppointment}
        opened={openDialog}
        onClose={() => {
          handleCloseDialog();
        }}
      />
    </Box>
  );
};

export default MyAppointments;
