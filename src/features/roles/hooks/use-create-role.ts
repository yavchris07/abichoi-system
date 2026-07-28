import { useState } from "react";
import { roleApi } from "../api";
import type { Role } from "../../../utils/types";

export const useCreateRole = (token:string) => {

  const [pending, setPending] = useState(false);
  const [fail, setFail] = useState("");

  const create = async (data:Role) => {
    if (pending) return;
    try {

      setPending(true);
      setFail("");
      const response = await roleApi.create(data,token);
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

  return {create, pending, fail };
};