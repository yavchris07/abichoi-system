
import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api";

export const useUserByShop = (token: string) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await userApi.get(token);
      return res.data;
    },
  });
};