import { useQualifiedValuesService } from "@/services/qualifiedValues/qualifiedValues.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import {
  Form,
  useFormSchema,
} from "@/modules/observationDefinitions/Components/ObservationDefinitionsShow/QualifiedValues/QualifiedValuesForm/validation";
import { serializer } from "@/modules/observationDefinitions/Components/ObservationDefinitionsShow/QualifiedValues/QualifiedValuesForm/serializer";
import { useNavigate } from "react-router-dom";

export const useCreateQualifiedValues = (id?: number) => {
  const invalidate = useQualifiedValuesService().index().invalidate;
  const navigate = useNavigate();
  const { formSchema } = useFormSchema();
  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
  });

  const { mutate, isPending: mutateLoading } = useQualifiedValuesService()
    .create()
    .useMutation(id, {
      onSuccess: (res) => {
        if (res.data.status) {
          enqueueSnackbar({
            message: "Qualified values added successful",
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
