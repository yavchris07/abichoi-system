import { useState } from "react";
import { cashDepositApi } from "../api";

export const useDeleteDeposit = (token: string) => {
  const [pending, setPending] = useState(false);
  const [fail, setFail] = useState("");

  const deleteDeposit = async (id: number) => {
    if (pending) return;
    try {
      setPending(true);
      setFail("");
      const response = await cashDepositApi.delete(token, id);
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

  return { deleteDeposit, pending, fail };
};
