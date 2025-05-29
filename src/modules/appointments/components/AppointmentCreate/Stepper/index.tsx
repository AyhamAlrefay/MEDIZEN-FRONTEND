import { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Button, Stack } from "@mui/material";
import ClinicSelect from "./ClinicSelect";
import DoctorSelect from "./DoctorSelect";
import TypeSelect from "./TypeSelect";
import DetailsAppointment from "./DetailsAppointment";
import { useFormSchema, type Form } from "../CreateForm/validation";
import { type UseFormReturn } from "react-hook-form";
import { useUserService } from "@/services/user/user.service";

interface StepperProps {
  formSchema: ReturnType<typeof useFormSchema>["formSchema"];
  methods: UseFormReturn<Form>;
  isLoading: boolean;
}

export default function CreateStepper({
  methods,
  formSchema,
  isLoading,
}: StepperProps) {
  const { data: User, isLoading: isUserLoading } = useUserService()
    .showMe()
    .useQuery();
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
  const [isStepValid, setIsStepValid] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const handleNext = () => {
    if (activeStep <= steps.length - 1) setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const typeSelected = methods.watch("type");

  const stepFields: { [key: number]: (keyof Form)[] } = {
    1: ["clinic_id"],
    2: ["doctor_id"],
    3: ["type"],
    4:
      typeSelected?.code == "predefined"
        ? ["slot_id", "patient", "reason", "description", "note"]
        : [
            "start_date",
            "patient",
            "end_date",
            "note",
            "reason",
            "description",
            "note",
          ],
  };

  useEffect(() => {
    const validateStep = async () => {
      const fields = stepFields[activeStep];
      const result = await methods.trigger(fields);
      setIsStepValid(result);
    };
    validateStep();
  }, [activeStep, methods.watch(), activeStep]);

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return <ClinicSelect methods={methods} />;
      case 2:
        return <DoctorSelect methods={methods} />;
      case 3:
        return <TypeSelect methods={methods} />;
      case 4:
        return <DetailsAppointment methods={methods} formSchema={formSchema} />;
    }
  };

  useEffect(() => {
    if (User?.data?.profile?.id)
      methods.setValue("created_by_practitioner", User?.data?.profile?.id);
  }, [User]);

  return (
    <Stack
      justifyContent={"space-between"}
      sx={{ width: "100%", minHeight: "66vh" }}
    >
      <Stepper activeStep={activeStep} sx={{ mx: "auto", width: "70%" }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Stack sx={{ height: "100%", mt: 4 }} justifyContent="space-between">
        {renderStep()}
        <Stack direction={"row"} justifyContent="center" sx={{ mt: 2 }}>
          <Button
            disabled={activeStep === 1}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Previous
          </Button>
          <Button
            disabled={!isStepValid || isLoading}
            variant="contained"
            onClick={handleNext}
            type="submit"
          >
            {activeStep >= steps.length ? "Finish" : "Next"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
