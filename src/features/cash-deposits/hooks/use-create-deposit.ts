
import { useState } from "react";
import { cashDepositApi } from "../api";
import type { DepositPayload } from "../../../utils/types";

export const useCreateDeposit = (token: string) => {
  const [pending, setPending] = useState(false);
  const [fail, setFail] = useState("");

  const create = async (data: DepositPayload) => {
    if (pending) return;
    try {
      setPending(true);
      setFail("");
      const response = await cashDepositApi.create(data, token);
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
