import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Expense } from "../../../utils/types";
import { expenseApi } from "../api";

export const useCreateExpense = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Expense) => expenseApi.create(data, token),

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
