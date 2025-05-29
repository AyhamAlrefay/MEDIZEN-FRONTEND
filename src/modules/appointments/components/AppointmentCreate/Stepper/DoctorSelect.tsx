import { type Form } from "../CreateForm/validation";
import { type UseFormReturn } from "react-hook-form";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Avatar,
  Typography,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useClinicsReceptionistService } from "@/services/clinics/clinics.service";
import { Practitioner } from "@/services/practitioner/practitioner.types";
import { PageLoader } from "@/shared/components/PageLoader";
interface StepProps {
  methods: UseFormReturn<Form>;
}
const DoctorSelect = ({ methods }: StepProps) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(
    methods.watch("doctor_id")
  );
  const ClinicId = methods.watch("clinic_id");

  const { data, isLoading } = useClinicsReceptionistService()
    .index()
    .useQuery(ClinicId);
  const Doctors = data?.data?.doctors?.data;

  const handleSelect = (Doctor: Practitioner) => {
    methods.setValue("doctor_id", Doctor.id, { shouldValidate: true });
    setSelectedDoctorId(Doctor.id);
  };

  if (isLoading) return <PageLoader />;
  return (
    <Stack spacing={2}>
      <Typography variant="h6" color="primary">
        Select a Doctor
      </Typography>
      <Grid container spacing={3}>
        {Doctors?.map((doctor: Practitioner) => {
          const isSelected = doctor.id === selectedDoctorId;
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={doctor.id}>
              <Card
                onClick={() => handleSelect(doctor)}
                sx={{
                  backgroundImage: isSelected
                    ? "linear-gradient(145deg, #bbdefb, #e3f2fd)"
                    : "none",
                  position: "relative",
                  cursor: "pointer",
                  borderRadius: 3,
                  height: "100%",
                  boxShadow: isSelected
                    ? "0 0 12px rgba(25, 118, 210, 0.4)"
                    : 1,
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardActionArea
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 2,
                    height: "100%",
                  }}
                >
                  <Avatar
                    src={doctor.avatar}
                    alt={doctor.f_name}
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 1,
                      border: "2px solid #ccc",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {`${doctor.prefix ?? ""} ${doctor.f_name} ${
                        doctor.l_name
                      }`}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {doctor.roles?.[0]?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {doctor.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {doctor.text}
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

export default DoctorSelect;
