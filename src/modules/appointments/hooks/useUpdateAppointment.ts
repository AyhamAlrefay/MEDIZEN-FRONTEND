import { useAppointmentsService } from "./../../../services/appointments/appointments.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import {
  deserializer,
  serializer,
} from "../components/AppointmentUpdate/UpdateForm/serializer";
import {
  Form,
  useFormSchema,
} from "../components/AppointmentUpdate/UpdateForm/validation";
import { Appointments } from "@/services/appointments/appointments.types";
import { useDialog } from "@/shared/hooks/useDialog";

export const useUpdateAppointment = ({
  appointment,
  onSuccess,
}: {
  appointment: Appointments;
  onSuccess: any;
}) => {
  const { handleCloseDialog, handleOpenDialog, openDialog } = useDialog();
  const { formSchema } = useFormSchema();

  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
    defaultValues: deserializer(appointment),
  });

  const { mutate, isPending: mutateLoading } = useAppointmentsService()
    .update()
    .useMutation(appointment.id, {
      onSuccess: (res) => {
        if (res.data.status) {
          handleCloseDialog();
          enqueueSnackbar({
            message: "Appointment edited successful",
            variant: "success",
          });
          onSuccess();
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
    handleCloseDialog,
    handleOpenDialog,
    openDialog,
  };
};
