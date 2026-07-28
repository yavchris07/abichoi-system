import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api";

export const useUsers = (token: string) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await userApi.getAll(token);
      return res.data;
    },
  });
};