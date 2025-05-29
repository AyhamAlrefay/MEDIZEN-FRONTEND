import { usePatientService } from "../../../services/patients/patients.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import {
  deserializer,
  serializer,
} from "../components/PatientUpdate/PatientForm/serializer";
import {
  Form,
  useFormSchema,
} from "../components/PatientUpdate/PatientForm/validation";
import { Patient } from "@/services/patients/patients.types";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdatePatient = ({ patient }: { patient: Patient }) => {
  const { formSchema } = useFormSchema();
  const invalidate = usePatientService().indexOne().invalidate;

  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
    defaultValues: deserializer(patient),
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending: mutateLoading } = usePatientService()
    .update()
    .useMutation(patient.id, {
      onSuccess: (res) => {
        if (res.data.status) {
          enqueueSnackbar({
            message: "patient edited successful",
            variant: "success",
          });
          invalidate(patient.id);
          navigate(-1);
        }
      },
    });

  const isLoading = mutateLoading;

  const onSubmit = methods.handleSubmit(async (input: Form) => {
    mutate(serializer(input));
  });
  return {
    /**
     * **Description:** methods of react-hooks-from
     */
    methods,
    /**
     * **Description:** submit function
     */
    onSubmit,
    /**
     * **Description:** validations of my schema
     */
    formSchema,
    /**
     * **Description:** loading for update mutations
     */
    isLoading,
  };
};
