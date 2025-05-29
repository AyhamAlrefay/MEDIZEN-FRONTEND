import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { PagesRoutes } from "@/constants";
import { Form } from "../components/OrganizationShow/validation";
import { useFormSchema } from "../components/OrganizationShow/validation";
import { useOrganizationService } from "@/services/organization/organization.service";
import {
  deserializer,
  serializer,
} from "../components/OrganizationShow/serializer";

export const useUpdateOrganization = () => {
  const navigate = useNavigate();
  const { formSchema } = useFormSchema();

  const { data, isLoading: isFetching } = useOrganizationService()
    .show()
    .useQuery({
      enabled: false,
    });
  console.log(data);

  const invalidate = useOrganizationService().show().invalidate;

  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
    ...(data?.data && {
      defaultValues: deserializer(data?.data?.organization),
    }),
  });

  const { mutate, isPending: mutateLoading } = useOrganizationService()
    .update()
    .useMutation({
      onSuccess: (res) => {
        if (res.data.status) {
          enqueueSnackbar({
            message: "Organization updated successfully",
            variant: "success",
          });
          invalidate();
          navigate(PagesRoutes.organization.path);
        } else {
          enqueueSnackbar({
            message: res.data.msg || "Failed to update organization",
            variant: "error",
          });
        }
      },
      onError: (error) => {
        enqueueSnackbar({
          message: error.message || "Failed to update organization",
          variant: "error",
        });
      },
    });

  const isLoading = isFetching || mutateLoading;

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
