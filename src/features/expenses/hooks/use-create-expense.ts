import { useMutation, useQueryClient } from "@tanstack/react-query";
// import type { Expense } from "../../../utils/types";
import { expenseApi } from "../api";
import type { ExpenseFormData } from "../components/create-expense";

export const useCreateExpense = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ExpenseFormData) => expenseApi.create(data, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });

  return {
    create: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};
