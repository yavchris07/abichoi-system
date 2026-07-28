import { useState } from "react";
import { authApi } from "../api";
import type { LoginData } from "../../../utils/types";

export const useLogin = () => {
  const [pending, setPending] = useState(false);
  const [fail, setFail] = useState("");

  const login = async (data: LoginData) => {
    if (pending) return;
    try {
      setPending(true);
      setFail("");
      const response = await authApi.login(data);
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

  return { login, pending, fail };
};
