import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ContratRegisterPayload } from "../../../utils/types";
import { contratApi } from "../api";

export const useCreateContratRegister = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ContratRegisterPayload) => contratApi.create(data, token),

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
