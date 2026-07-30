import { useQuery } from "@tanstack/react-query";
import { cashDepositApi } from "../api";

export const useDeposits = (token: string) => {
  return useQuery({
    queryKey: ["deposits"],
    queryFn: async () => {
      const res = await cashDepositApi.getAll(token);
      return res.data;
    },
  });
};
