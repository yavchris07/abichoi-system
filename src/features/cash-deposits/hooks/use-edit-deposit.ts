import { useState } from "react";
import { cashDepositApi } from "../api";
import type { Deposit } from "../../../utils/types";

export const useEditDeposit = (token: string) => {
  const [pending, setPending] = useState(false);
  const [fail, setFail] = useState("");

  const editDeposit = async (data: Deposit) => {
    if (pending) return;
    try {
      setPending(true);
      setFail("");
      const response = await cashDepositApi.update(token, data);
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

  return { editDeposit, pending, fail };
};
