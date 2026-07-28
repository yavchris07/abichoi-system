import { useQuery } from "@tanstack/react-query";
import { sessionApi } from "../api";

export const useSessions = (token: string) => {
  return useQuery({
    queryKey: ["user_sessions"],
    queryFn: async () => {
      const res = await sessionApi.getAll(token);
      return res.data;
    },
  });
};