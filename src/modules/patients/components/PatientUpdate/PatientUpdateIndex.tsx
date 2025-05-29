import { Patient } from "@/services/patients/patients.types";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUpdatePatient } from "../../hooks/useUpdatePatient";
import { PatientForm } from "./PatientForm/PatientForm";

const PatientUpdate = ({ patient }: { patient: Patient }) => {
  const { formSchema, isLoading, methods, onSubmit } = useUpdatePatient({
    patient,
  });

  const navigate = useNavigate();
  return (
    <Stack sx={{ bgcolor: "white", borderRadius: 6, p: "28px 26px" }}>
      <Stack mb="1rem">
        <Typography variant="h6" color="primary">
          Edit Patient
        </Typography>
        <PatientForm
          formSchema={formSchema}
          methods={methods}
          onSubmit={onSubmit}
          actionsComponent={
            <Stack
              direction="row"
              sx={{
                justifyContent: "flex-end",
                mt: "5rem",
                columnGap: "1.75rem",
              }}
            >
              <Button
                type="button"
                sx={{ paddingX: 7, paddingY: 1 }}
                variant="outlined"
                onClick={() => navigate(-1)}
              >
                cancel
              </Button>
              <Button
                type="submit"
                sx={{ paddingX: 7, paddingY: 1 }}
                variant="contained"
                disabled={isLoading}
              >
                save
              </Button>
            </Stack>
          }
        />
      </Stack>
    </Stack>
  );
};

export default PatientUpdate;
