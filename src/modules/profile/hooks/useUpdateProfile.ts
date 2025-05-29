import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form, useFormSchema } from "../component/ProfileUpdate/validation";
import { useUserService } from "@/services/user/user.service";
import {
  deserializer,
  serializer,
} from "../component/ProfileUpdate/serializer";
import { enqueueSnackbar } from "notistack";
import { PagesRoutes } from "@/constants";
import { UserUpdateProfilePayload } from "@/services/user/user.types";

export const useUpdateProfile = () => {
  const navigate = useNavigate();
  const { formSchema } = useFormSchema();
  const { data } = useUserService().showMe().useQuery({ enabled: false });
  const invalidate = useUserService().showMe().invalidate;
  const methods = useForm<Form>({
    resolver: yupResolver(formSchema),
    ...(data?.data && {
      defaultValues: deserializer(data?.data?.profile),
    }),
  });

  const { mutate, isPending: mutateLoading } = useUserService()
    .updateMe()
    .useMutation({
      onSuccess: (res) => {
        if (res.data.status) {
          enqueueSnackbar({
            message: "Profile updated successful",
            variant: "success",
          });
          invalidate();
          navigate(PagesRoutes.profile.path);
        }
      },
    });

  const isLoading = mutateLoading;

  const onSubmit = methods.handleSubmit(async (input: Form) => {
    if (input.avatar) {
      const formdata = new FormData();
      Object.entries(serializer(input))?.map((key) =>
        formdata.append(key[0], key[1]),
      );
      mutate(formdata as UserUpdateProfilePayload);
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
