import { type Form } from "../CreateForm/validation";
import { type UseFormReturn } from "react-hook-form";
import { CodeTypes } from "@/types/code-types";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { useState } from "react";
import { useCodesService } from "@/services/codes/codes.service";
import { Code } from "@/services/codes/codes.types";
import { PageLoader } from "@/shared/components/PageLoader";

const iconMap: Record<string, JSX.Element> = {
  predefined: <EventAvailableIcon fontSize="large" color="primary" />,
  emergency_type: <PriorityHighIcon fontSize="large" color="error" />,
  waiting: <HourglassEmptyIcon fontSize="large" color="warning" />,
};

interface StepProps {
  methods: UseFormReturn<Form>;
}

const TypeSelect = ({ methods }: StepProps) => {
  const { data, isLoading } = useCodesService()
    .index()
    .useQuery({ code_type_id: CodeTypes.typeAppointment }, {});
  const Types = data?.data?.codes.data;

  const [selectedType, setSelectedType] = useState<Code | null>(
    methods.watch("type")
  );

  const handleSelect = (typeId: Code) => {
    methods.setValue("type", typeId, { shouldValidate: true });
    setSelectedType(typeId);
  };

  if (isLoading) return <PageLoader />;
  return (
    <Stack spacing={2}>
      <Typography variant="h6" color="primary">
        Select Appointment Type
      </Typography>
      <Grid container spacing={3}>
        {Types?.map((type: Code) => {
          const isSelected = selectedType?.id === type.id;
          return (
            <Grid item xs={12} sm={6} md={4} key={type.id}>
              <Card
                onClick={() => handleSelect(type)}
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  borderRadius: 3,
                  height: "100%",
                  boxShadow: isSelected
                    ? "0 0 12px rgba(25, 118, 210, 0.4)"
                    : 1,
                  border: isSelected ? "2px solid #1976d2" : "1px solid #eee",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {isSelected && (
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "white",
                      zIndex: 2,
                      color: "#1976d2",
                    }}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                )}
                <CardActionArea
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 3,
                    height: "100%",
                  }}
                >
                  {iconMap[type.code]}
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {type.display}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {type.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default TypeSelect;
