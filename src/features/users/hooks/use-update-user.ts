import { useState } from "react";
import { userApi } from "../api";
import type { User } from "../../../utils/types";

export const useUpdateUser = (token: string) => {
  const [pending, setPending] = useState(false);
  const [fail, setFail] = useState("");

  const updateUser = async (data: User) => {
    if (pending) return;
    try {
      setPending(true);
      setFail("");
      const response = await userApi.update(token, data);
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

  return { updateUser, pending, fail };
};
