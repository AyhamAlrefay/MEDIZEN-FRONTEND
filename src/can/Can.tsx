import React from "react";
import { Actions } from "./permissions";
import { useCan } from "./useCan";

interface CanProps {
  action: Actions | undefined;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const Can: React.FC<CanProps> = ({
  action,
  children,
  fallback = null,
}) => {
  if (!action) return <>{children}</>;
  const { can } = useCan({ action });

  return can ? <>{children}</> : <>{fallback}</>;
};
