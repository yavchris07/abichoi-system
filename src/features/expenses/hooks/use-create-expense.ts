
import { useState } from "react";
import { expenseApi } from "../api";
import type { Expense } from "../../../utils/types";

export const useCreateExpense = (token: string) => {
  const [pending, setPending] = useState(false);
  const [fail, setFail] = useState("");

  const create = async (data: Expense) => {
    if (pending) return;
    try {
      setPending(true);
      setFail("");
      const response = await expenseApi.create(data, token);
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
