import { useQuery } from "@tanstack/react-query";
import { cashMovementApi } from "../api";

export const useCashMovements = (token: string) => {
  return useQuery({
    queryKey: ["cash_movements"],
    queryFn: async () => {
      const res = await cashMovementApi.getAll(token);
      return res.data;
    },
  });
};



