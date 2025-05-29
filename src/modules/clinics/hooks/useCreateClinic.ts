import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { useClinicsService } from "@/services/clinics/clinics.service";
import { useDialog } from "@/shared/hooks/useDialog";
import {
  Form,
  useFormSchema,
} from "../components/ClinicsIndex/ClinicForm/validation";
import { serializer } from "../components/ClinicsIndex/ClinicForm/serializer";
import { ClinicPayload } from "@/services/clinics/clinics.types";

export const useCreateClinic = () => {
  const { handleCloseDialog, handleOpenDialog, openDialog } = useDialog();
  const invalidate = useClinicsService().index().invalidate;
  const { formSchema } = useFormSchema({ mode: "create" });
  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
  });

  const { mutate, isPending: mutateLoading } = useClinicsService()
    .create()
    .useMutation({
      onSuccess: (res) => {
        if (res.data.status) {
          methods.reset();
          enqueueSnackbar({
            message: "clinic added successful",
            variant: "success",
          });
          invalidate();
          handleCloseDialog();
        }
      },
    });

  const isLoading = mutateLoading;

  const onSubmit = methods.handleSubmit(async (input: Form) => {
    if (input?.photo) {
      const formdata = new FormData();
      Object.entries(serializer(input))?.map((key) =>
        formdata.append(key[0], key[1] as string),
      );
      mutate(formdata as ClinicPayload);
    } else {
      mutate(serializer(input));
    }
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
