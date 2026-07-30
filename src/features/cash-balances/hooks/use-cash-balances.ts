import { useQuery } from "@tanstack/react-query";
import { cashBalanceApi } from "../api";

export const useCashBalances = (token: string) => {
  return useQuery({
    queryKey: ["balances"],
    queryFn: async () => {
      const res = await cashBalanceApi.getAll(token);
      return res.data;
    },
  });
};
