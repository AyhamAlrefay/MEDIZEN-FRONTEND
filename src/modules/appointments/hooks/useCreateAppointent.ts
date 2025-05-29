import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import {
  Form,
  useFormSchema,
} from "../components/AppointmentCreate/CreateForm/validation";
import { serializer } from "../components/AppointmentCreate/CreateForm/serializer";
import { useAppointmentsService } from "@/services/appointments/appointments.service";
import { useNavigate } from "react-router-dom";

export const useCreateAppointment = () => {
  const invalidate = useAppointmentsService().index().invalidate;
  const navigate = useNavigate();
  const { formSchema } = useFormSchema();
  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
  });

  const { mutate, isPending: mutateLoading } = useAppointmentsService()
    .create()
    .useMutation({
      onSuccess: (res) => {
        if (res.data.status) {
          navigate(-1);
          invalidate();
          enqueueSnackbar({
            message: "Appointment added successful",
            variant: "success",
          });
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
