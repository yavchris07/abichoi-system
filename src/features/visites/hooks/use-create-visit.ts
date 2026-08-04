import { useState } from "react";
import { visitorApi } from "../api";
import type { Visitor } from "../../../utils/types";

export const useCreateVisit = (token: string) => {
  const [pending, setPending] = useState(false);
  const [fail, setFail] = useState("");

  const create = async (data: Visitor) => {
    if (pending) return;
    try {
      setPending(true);
      setFail("");
      const response = await visitorApi.create(data, token);
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
