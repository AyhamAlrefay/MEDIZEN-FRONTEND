import { useMemo } from "react";
import { Actions } from "./permissions";
import { useMeStore } from "@/store/meStore";

interface UseCanProps {
  action: Actions;
}

export const useCan = ({ action }: UseCanProps) => {
  const mePermissions = useMeStore((state) => state.data?.permissions);

  const can = useMemo(() => {
    return mePermissions?.map((permission) => permission.name).includes(action);
  }, [action, mePermissions]);

  return {
    can,
  };
};
