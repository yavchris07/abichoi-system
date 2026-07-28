
import { useState } from "react";
import { roleApi } from "../api";

export const useDeleteRole = (token:string) => {

  const [pending, setPending] = useState(false);
  const [fail, setFail] = useState("");

  const deleteRole = async (id:string) => {
    if (pending) return;
    try {

      setPending(true);
      setFail("");
      const response = await roleApi.delete(token,id);
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

  return {deleteRole, pending, fail };
};