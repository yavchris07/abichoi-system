import { useQuery } from "@tanstack/react-query";
import { expenseCategoryApi } from "../api";

export const useExpenseCategories = (token: string) => {
  return useQuery({
    queryKey: ["expense-categorie"],
    queryFn: async () => {
      const res = await expenseCategoryApi.getAll(token);
      return res.data;
    },
  });
};
