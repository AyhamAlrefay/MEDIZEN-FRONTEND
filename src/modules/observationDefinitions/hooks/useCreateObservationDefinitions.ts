import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import {
  Form,
  useFormSchema,
} from "../Components/ObservationDefinitionsForm/validation";
import { serializer } from "../Components/ObservationDefinitionsForm/serializer";
import { useObservationDefinitionsService } from "@/services/observationDefinitions/observationDefinitions.service";
import { useNavigate } from "react-router-dom";

export const useCreateObservationDefinitions = () => {
  const invalidate = useObservationDefinitionsService().index().invalidate;
  const navigate = useNavigate();
  const { formSchema } = useFormSchema();
  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
  });

  const { mutate, isPending: mutateLoading } =
    useObservationDefinitionsService()
      .create()
      .useMutation({
        onSuccess: (res) => {
          if (res.data.status) {
            enqueueSnackbar({
              message: "Observation definition added successful",
              variant: "success",
            });
            navigate(-1);
            invalidate();
          }
        },
      });

  const isLoading = mutateLoading;

  const onSubmit = methods.handleSubmit(async (input: Form) => {
    // mutate(serializer(input));
    console.log(serializer(input));
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
