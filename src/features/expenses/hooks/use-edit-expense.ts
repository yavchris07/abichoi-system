import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Expense } from "../../../utils/types";
import { expenseApi } from "../api";


export const useEditExpense = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Expense) => expenseApi.update(token, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });

  return {
    editExpense: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};