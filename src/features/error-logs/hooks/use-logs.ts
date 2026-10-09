import { useQuery } from "@tanstack/react-query";
import { errorLogsApi } from "../api";

export const useLogs = (token: string) => {
  return useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      const res = await errorLogsApi.getAll(token);
      return res.data;
    },
  });
};
