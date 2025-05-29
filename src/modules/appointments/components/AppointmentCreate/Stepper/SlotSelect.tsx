import { useSlotsService } from "@/services/slots/slots.service";
import { type Form } from "../CreateForm/validation";
import { type UseFormReturn } from "react-hook-form";
import { PageLoader } from "@/shared/components/PageLoader";
import { Slot } from "@/services/slots/slots.types";
import { format, parseISO, isSameDay } from "date-fns";
import { Box, Typography, Grid, Paper, Chip, Button } from "@mui/material";
import { useState } from "react";
import { useUserService } from "@/services/user/user.service";
interface StepProps {
  methods: UseFormReturn<Form>;
}
const SlotSelect = ({ methods }: StepProps) => {
  const { data, isLoading } = useSlotsService().index().useQuery();
  const Slots: Slot[] | undefined = data?.data?.slots;
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filters, setFilters] = useState<{
    practitioner_id?: number;
    date?: string;
  }>({
    practitioner_id: undefined,
    date: undefined,
  });

  const { data: generateData, isLoading: generateLoading } = useSlotsService()
    .generate()
    .useQuery(filters, {
      enabled: !!filters.date && !!filters.practitioner_id,
    });

  const handleDateClick = (dateStr: string) => {
    setSelectedDate(parseISO(dateStr));
  };

  const handelSelectSlot = async (slot: Slot) => {
    setSelectedSlot(slot);
    const date: string = format(parseISO(slot.start_date), "yyyy-MM-dd");
    setFilters({ practitioner_id: 1, date });
    methods.setValue("slot_id", slot.id, { shouldValidate: true });
  };

  const filteredSlots = Slots?.filter(
    (slot) => selectedDate && isSameDay(parseISO(slot.start_date), selectedDate)
  );

  const uniqueDates = Array.from(
    new Set(
      Slots?.map((slot) => format(parseISO(slot.start_date), "yyyy-MM-dd"))
    )
  );

  if (isLoading) return <PageLoader />;
  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {uniqueDates.map((dateStr) => (
          <Grid item key={dateStr}>
            <Button
              variant={
                selectedDate && format(selectedDate, "yyyy-MM-dd") === dateStr
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleDateClick(dateStr)}
            >
              {format(parseISO(dateStr), "dd MMM yyyy")}
            </Button>
          </Grid>
        ))}
      </Grid>
      {selectedDate && (
        <Paper
          elevation={2}
          sx={{
            maxHeight: "45vh",
            overflowY: "auto",
            p: 2,
            borderRadius: 3,
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c1c1c1",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#a8a8a8",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
            },
          }}
        >
          <Grid container spacing={2}>
            {filteredSlots?.map((slot) => (
              <Grid item xs={12} key={slot.id} sm={6} md={4} lg={3} xl={1}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    borderLeft: `5px solid ${
                      slot.status.code === "available" ? "#4caf50" : "#f44336"
                    }`,
                    cursor:
                      slot.status.id == 79 && !generateLoading ? "pointer" : "",
                  }}
                  onClick={() =>
                    slot.status.id == 79 ? handelSelectSlot(slot) : null
                  }
                >
                  <Typography variant="h6">
                    {format(parseISO(slot.start_date), "hh:mm a")} -{" "}
                    {format(parseISO(slot.end_date), "hh:mm a")}
                  </Typography>
                  <Chip
                    disabled={slot.status.id !== 79 || generateLoading}
                    label={"Generate"}
                    color={slot?.status?.id == 79 ? "success" : "error"}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default SlotSelect;
