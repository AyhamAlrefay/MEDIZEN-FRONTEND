import React from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Stack,
} from "@mui/material";
import {
  AccessTime,
  Person,
  Info,
  Label,
  PendingActions,
  Notes,
  Schedule,
} from "@mui/icons-material";
import { format, parseISO } from "date-fns";
import { Appointments } from "@/services/appointments/appointments.types"; // غير حسب مكانك

interface Props {
  appointment?: Appointments;
  onClose: any;
  opened: any;
}
const ShowDetails = ({ appointment, onClose, opened }: Props) => {
  return (
    <Dialog open={!!opened} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>Appointment Details</DialogTitle>
      <DialogContent>
        {appointment && (
          <Stack spacing={2}>
            <Box display="flex" alignItems="center">
              <AccessTime sx={{ color: "primary.main", mr: 1 }} />
              <Typography>
                {format(parseISO(appointment.start_date), "yyyy-MM-dd")} at{" "}
                {format(parseISO(appointment.start_date), "hh:mm a")}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Schedule sx={{ color: "secondary.main", mr: 1 }} />
              <Typography>
                Duration: {appointment.minutes_duration} m
              </Typography>
            </Box>

            <Divider />

            <Box display="flex" alignItems="center">
              <PendingActions sx={{ color: "info.main", mr: 1 }} />
              <Typography>Type: {appointment.type.display}</Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Label sx={{ color: "warning.main", mr: 1 }} />
              <Typography>Status: {appointment.status.display}</Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Person sx={{ color: "success.main", mr: 1 }} />
              <Typography>
                Patient: {appointment.patient.f_name}{" "}
                {appointment.patient.l_name}
              </Typography>
            </Box>

            <Divider />

            <Box display="flex" alignItems="center">
              <Info sx={{ color: "error.main", mr: 1 }} />
              <Typography>Reason: {appointment.reason || "---"}</Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Notes sx={{ color: "text.secondary", mr: 1 }} />
              <Typography>Note: {appointment.note || "---"}</Typography>
            </Box>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShowDetails;
