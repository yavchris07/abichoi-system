import { useQuery } from "@tanstack/react-query";
import { mailReceivedApi } from "../api";

export const useMailReceived = (token: string) => {
  return useQuery({
    queryKey: ["mail-received"],
    queryFn: async () => {
      const res = await mailReceivedApi.getAll(token);
      return res.data;
    },
  });
};
