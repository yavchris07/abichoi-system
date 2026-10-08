import { useQuery } from "@tanstack/react-query";
import { contratApi } from "../api";

export const useContractRegister = (token: string) => {
  return useQuery({
    queryKey: ["contract_register"],
    queryFn: async () => {
      const res = await contratApi.getAll(token);
      return res.data;
    },
  });
};



