
import { useState } from "react";
import { withdrawalApi } from "../api";
import type { Withdrawal } from "../../../utils/types";

export const useCreatewithdrawal = (token: string) => {
  const [pending, setPending] = useState(false);
  const [fail, setFail] = useState("");

  const create = async (data: Withdrawal) => {
    if (pending) return;
    try {
      setPending(true);
      setFail("");
      const response = await withdrawalApi.create(data, token);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setFail(error.message);
      } else {
        setFail("Une erreur inconnue est survenue");
      }

      throw error;
    } finally {
      setPending(false);
    }
  };

  return { create, pending, fail };
};
