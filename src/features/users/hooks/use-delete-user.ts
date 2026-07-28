
import { useState } from "react";
import { userApi } from "../api";

export const useDeleteUser = (token:string) => {

  const [pending, setPending] = useState(false);
  const [fail, setFail] = useState("");

  const deleteUser = async (id:string) => {
    if (pending) return;
    try {

      setPending(true);
      setFail("");
      const response = await userApi.delete(token,id);
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

  return {deleteUser, pending, fail };
};