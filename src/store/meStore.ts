import { UserWithPermissions } from "@/services/user/user.types";
import { create } from "zustand";

interface MeStore {
  data: UserWithPermissions | undefined;
  set: (res: UserWithPermissions) => void;
  clear: () => void;
}

export const useMeStore = create<MeStore>((set) => ({
  data: undefined,
  set: (res: UserWithPermissions) => set(() => ({ data: res })),
  clear: () => set(() => ({ data: undefined })),
}));
