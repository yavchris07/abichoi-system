
import { useState } from "react";
import { roleApi } from "../api";
import type { Role } from "../../../utils/types";

export const useEditRole = (token:string) => {

  const [pending, setPending] = useState(false);
  const [fail, setFail] = useState("");

  const editRole = async (data:Role) => {
    if (pending) return;
    try {

      setPending(true);
      setFail("");
      const response = await roleApi.update(token,data);
      return response;
    } catch (error) {

      if (error instanceof Error) {
        setFail(error.message);
      } else {
        setFail(
          "Une erreur inconnue est survenue"
        );
      }

      throw error;

    } finally {

      setPending(false);
    }
  };

  return {editRole, pending, fail };
};