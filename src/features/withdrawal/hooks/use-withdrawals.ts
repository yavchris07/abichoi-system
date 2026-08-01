import { useQuery } from "@tanstack/react-query";
import {  withdrawalApi } from "../api";

export const useWithdrawals = (token: string) => {
  return useQuery({
    queryKey: ["withdrawals"],
    queryFn: async () => {
      const res = await  withdrawalApi.getAll(token);
      return res.data;
    },
  });
};
