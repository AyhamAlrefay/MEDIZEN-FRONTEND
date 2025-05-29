import { useClinicsService } from "../../../services/clinics/clinics.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { useDialog } from "@/shared/hooks/useDialog";
import { Clinic, ClinicPayload } from "@/services/clinics/clinics.types";
import {
  deserializer,
  serializer,
} from "../components/ClinicsIndex/ClinicForm/serializer";
import {
  Form,
  useFormSchema,
} from "../components/ClinicsIndex/ClinicForm/validation";

export const useUpdateClinic = ({ clinic }: { clinic: Clinic }) => {
  const { handleCloseDialog, handleOpenDialog, openDialog } = useDialog();

  const { formSchema } = useFormSchema({ mode: "update" });
  const invalidate = useClinicsService().index().invalidate;
  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
    defaultValues: deserializer(clinic),
  });

  const { mutate, isPending: mutateLoading } = useClinicsService()
    .update()
    .useMutation(clinic.id, {
      onSuccess: (res) => {
        if (res.data.status) {
          enqueueSnackbar({
            message: "clinic edited successful",
            variant: "success",
          });
          invalidate();
          handleCloseDialog();
        }
      },
    });

  const isLoading = mutateLoading;

  const onSubmit = methods.handleSubmit(async (input: Form) => {
    if (input?.photo && typeof input.photo !== "string") {
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
