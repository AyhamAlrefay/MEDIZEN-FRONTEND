import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import {
  deserializer,
  serializer,
} from "@/modules/observationDefinitions/Components/ObservationDefinitionsShow/QualifiedValues/QualifiedValuesForm/serializer";
import {
  Form,
  useFormSchema,
} from "@/modules/observationDefinitions/Components/ObservationDefinitionsShow/QualifiedValues/QualifiedValuesForm/validation";
import { useNavigate } from "react-router-dom";
import { useQualifiedValuesService } from "@/services/qualifiedValues/qualifiedValues.service";
import { QualifiedValues } from "@/services/qualifiedValues/qualifiedValues.types";
export const useUpdateQualifiedValues = ({
  qualifiedValues,
}: {
  qualifiedValues: QualifiedValues;
}) => {
  const { formSchema } = useFormSchema();
  const invalidate = useQualifiedValuesService().index().invalidate;
  const navigate = useNavigate();

  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
    defaultValues: deserializer(qualifiedValues),
  });

  const { mutate, isPending: mutateLoading } = useQualifiedValuesService()
    .update()
    .useMutation(qualifiedValues.id, {
      onSuccess: (res) => {
        if (res.data.status) {
          enqueueSnackbar({
            message: "Qualified values edited successful",
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
