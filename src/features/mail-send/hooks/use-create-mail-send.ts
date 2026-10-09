import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MailSendPayload } from "../../../utils/types";
import { mailSendApi } from "../api";

export const useCreateMailSend = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: MailSendPayload) => mailSendApi.create(data, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mail-send"],
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
