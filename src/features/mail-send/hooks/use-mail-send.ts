import { useQuery } from "@tanstack/react-query";
import { mailSendApi } from "../api";

export const useMailSend = (token: string) => {
  return useQuery({
    queryKey: ["mail-send"],
    queryFn: async () => {
      const res = await mailSendApi.getAll(token);
      return res.data;
    },
  });
};



