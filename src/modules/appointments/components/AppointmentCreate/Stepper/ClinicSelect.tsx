import { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Avatar,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useClinicsService } from "@/services/clinics/clinics.service";
import { type Form } from "../CreateForm/validation";
import { Clinic } from "@/services/clinics/clinics.types";
import MediZenImage from "@/assets/mediZen.png";
import { PageLoader } from "@/shared/components/PageLoader";
import { type UseFormReturn } from "react-hook-form";

interface StepProps {
  methods: UseFormReturn<Form>;
}

const ClinicSelect = ({ methods }: StepProps) => {
  const [selectedClinicId, setSelectedClinicId] = useState<number | null>(
    methods.watch("clinic_id")
  );
  const { data, isLoading } = useClinicsService().index().useQuery();
  const clinics = data?.data?.clinics?.data;

  const handleSelect = (clinic: Clinic) => {
    methods.setValue("clinic_id", clinic.id, { shouldValidate: true });
    setSelectedClinicId(clinic.id);
  };
  if (isLoading) return <PageLoader />;

  return (
    <Stack>
      <Typography variant="h6" color="primary" sx={{ m: 2 }}>
        Select a Clinic
      </Typography>
      <Grid container spacing={3}>
        {clinics?.map((clinic: Clinic) => {
          const isSelected = clinic.id === selectedClinicId;
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={clinic.id}>
              <Card
                onClick={() => handleSelect(clinic)}
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: isSelected
                    ? "0 0 12px rgba(25, 118, 210, 0.4)"
                    : 1,
                  border: isSelected ? "2px solid #1976d2" : "1px solid #eee",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    transform: "translateY(-2px)",
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
                    p: 3,
                    gap: 1,
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    src={clinic.photo ?? MediZenImage}
                    alt={clinic.name}
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 1,
                      border: "2px solid #ccc",
                    }}
                  />
                  <CardContent sx={{ padding: 0 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {clinic.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ minHeight: "40px" }}
                    >
                      {clinic.description}
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

export default ClinicSelect;
