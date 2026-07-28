import { useQuery } from "@tanstack/react-query";
import {  visitorApi } from "../api";

export const useVisitors = (token: string) => {
  return useQuery({
    queryKey: ["visitors"],
    queryFn: async () => {
      const res = await visitorApi.getAll(token);
      return res.data;
    },
  });
};