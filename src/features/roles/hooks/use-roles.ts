import { useQuery } from "@tanstack/react-query";
import { roleApi } from "../api";

export const useRoles = (token: string) => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const res = await roleApi.getAll(token);
      return res.data;
    },
  });
};



