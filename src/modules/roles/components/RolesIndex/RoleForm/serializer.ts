import { pick } from "lodash-es";
import { Form } from "./validation";
import { Role, RolePayload } from "@/services/roles/roles.types";

export const serializer = (input: Form): RolePayload => {
  return {
    name: input.name,
  };
};

export const deserializer = (role: Role): Form => {
  return pick(
    {
      ...role,
    },
    ["name"],
  );
};
