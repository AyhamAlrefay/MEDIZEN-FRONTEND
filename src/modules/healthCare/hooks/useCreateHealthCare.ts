import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { useHealthCareService } from "@/services/healthCare/healthCare.service";
import { Form, useFormSchema } from "../Components/HealthCareForm/validation";
import { serializer } from "../Components/HealthCareForm/serializer";
import { HealthCarePayload } from "@/services/healthCare/healthCare.types";
import { useNavigate } from "react-router-dom";
export const useCreateHealthCare = () => {
  const invalidate = useHealthCareService().index().invalidate;
  const navigate = useNavigate();
  const { formSchema } = useFormSchema();
  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
  });

  const { mutate, isPending: mutateLoading } = useHealthCareService()
    .create()
    .useMutation({
      onSuccess: (res) => {
        if (res.data.status) {
          enqueueSnackbar({
            message: "Health Care Service added successful",
            variant: "success",
          });
          navigate(-1);
          invalidate();
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
      mutate(formdata as HealthCarePayload);
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
  };
};
