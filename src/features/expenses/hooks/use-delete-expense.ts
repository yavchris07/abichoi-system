import { useMutation, useQueryClient } from "@tanstack/react-query";
import { expenseApi } from "../api";

export const useDeleteExpense = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => expenseApi.delete(token, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expense"],
      });
    },
  });

  return {
    deleteExpense: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};


