import { useShowMyAppointmentService } from "@/services/showMyAppointment/showMyAppointment.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { useDialog } from "@/shared/hooks/useDialog";
import { serializer } from "../components/ShowMyAppointmentsIndex/FinishedForm/serializer";
import {
  Form,
  useFormSchema,
} from "../components/ShowMyAppointmentsIndex/FinishedForm/validation";

export const useFinishedAppointment = ({ id }: { id: number }) => {
  const { handleCloseDialog, handleOpenDialog, openDialog } = useDialog();
  const { formSchema } = useFormSchema({ mode: "create" });
  const invalidate = useShowMyAppointmentService().index().invalidate;
  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
  });
  const { mutate, isPending: mutateLoading } = useShowMyAppointmentService()
    .finichAppointment()
    .useMutation(id, {
      onSuccess: (res) => {
        if (res.data.status) {
          enqueueSnackbar({
            message: "Finished appointment successful",
            variant: "success",
          });
          invalidate();
          handleCloseDialog();
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
