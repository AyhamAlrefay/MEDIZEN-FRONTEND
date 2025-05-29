import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { useObservationDefinitionsService } from "@/services/observationDefinitions/observationDefinitions.service";
import {
  deserializer,
  serializer,
} from "../Components/ObservationDefinitionsForm/serializer";
import {
  Form,
  useFormSchema,
} from "../Components/ObservationDefinitionsForm/validation";
import { useNavigate } from "react-router-dom";
import { ObservationDefinitions } from "@/services/observationDefinitions/observationDefinitions.types";
export const useUpdateObservationDefinitions = ({
  observationDefinition,
}: {
  observationDefinition: ObservationDefinitions;
}) => {
  const { formSchema } = useFormSchema();
  const invalidate = useObservationDefinitionsService().index().invalidate;
  const navigate = useNavigate();

  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
    defaultValues: deserializer(observationDefinition),
  });

  const { mutate, isPending: mutateLoading } =
    useObservationDefinitionsService()
      .update()
      .useMutation(observationDefinition.id, {
        onSuccess: (res) => {
          if (res.data.status) {
            enqueueSnackbar({
              message: "Observation definition edited successful",
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
