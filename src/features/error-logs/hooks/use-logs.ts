import { useQuery } from "@tanstack/react-query";
import { logsApi } from "../api";

export const useLogs = (token: string) => {
  return useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      const res = await logsApi.getAll(token);
      return res.data;
    },
  });
};
