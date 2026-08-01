import { useState } from "react";
import {  withdrawalApi } from "../api";

export const useDeletewithdrawal = (token: string) => {
  const [pending, setPending] = useState(false);
  const [fail, setFail] = useState("");

  const deletewithdrawal = async (id: number) => {
    if (pending) return;
    try {
      setPending(true);
      setFail("");
      const response = await withdrawalApi.delete(token, id);
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

  return { deletewithdrawal, pending, fail };
};
