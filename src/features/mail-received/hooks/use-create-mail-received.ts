import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MailReceivedPayload } from "../../../utils/types";
import { mailReceivedApi } from "../api";

export const useCreateMailReceived = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: MailReceivedPayload) =>
      mailReceivedApi.create(data, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mail-received"],
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
