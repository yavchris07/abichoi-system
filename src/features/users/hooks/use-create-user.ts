import { useState } from "react";
import { userApi } from "../api";
import type { User } from "../../../utils/types";

export const useCreateUser = (token: string) => {
  const [pending, setPending] = useState(false);
  const [fail, setFail] = useState("");

  const create = async (data: User) => {
    if (pending) return;
    try {
      setPending(true);
      setFail("");
      const response = await userApi.create(data, token);
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
