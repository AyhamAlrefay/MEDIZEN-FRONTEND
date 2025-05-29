import { useRolesService } from "@/services/roles/roles.service";
import { useUserService } from "@/services/user/user.service";
import { useMeStore } from "@/store/meStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Description
 * - this hook will fetch the necessary data for the system and fill the global states
 *
 * Note
 * - if you start the system without this hook you'll  get 502 on most of the routes when we reload any page and errors
 */
export const useResolver = () => {
  const setMeStore = useMeStore((state) => state.set);
  const me = useMeStore((state) => state.data);
  const navigate = useNavigate();

  // First query to get user data
  const { data: userData, isLoading: loadingUser } = useUserService()
    .showMe()
    .useQuery({
      retry: 1,
    });

  // Second query to get role permissions, enabled only when we have user data
  const { data: roleData, isLoading: loadingRole } = useRolesService()
    .getRolePermissions()
    .useQuery(userData?.data?.profile?.roles[0]?.id as number, {
      enabled: !!userData?.data?.profile?.roles[0]?.id,
      retry: 1,
    });

  useEffect(() => {
    if (userData?.data?.status && roleData?.data?.status) {
      setMeStore({
        ...userData.data?.profile,
        permissions: roleData.data?.role.permissions,
      });
    } else if (
      userData?.data.status === false ||
      roleData?.data.status === false
    ) {
      navigate("/status/502");
    }
  }, [userData, roleData, setMeStore, navigate]);

  return {
    appReady: !loadingUser && !loadingRole && !!me?.roles[0],
  };
};
