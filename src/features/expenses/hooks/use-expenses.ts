import { useQuery } from "@tanstack/react-query";
import { expenseApi } from "../api";

export const useExpenses = (token: string) => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await expenseApi.getAll(token);
      return res.data;
    },
  });
};
