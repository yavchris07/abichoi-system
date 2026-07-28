import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDeleteUser } from "../hooks/use-delete-user";
import type { User } from "../../../utils/types";
import { useToast } from "../../../components/customer-toast";
import Modal from "../../../components/modal";
import { getToken } from "../../../utils/get-token";

type modalProps = {
  open: string;
  onClose: () => void;
  user: User;
};

const DeleteUser = ({ user, open, onClose }: modalProps) => {
  const token = getToken();
  const { deleteUser, fail, pending } = useDeleteUser(token ?? "");
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ id: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteUser(user.id);
      showToast("Suppression utilisateur reussie !", "success");
      onClose();
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        showToast(fail, "error");
      } else {
        console.log("error");
        showToast(fail, "error");
      }
    }
  };

  if (open === null) return null;

  return (
    <Modal>
      <div className="flex justify-between items-center my-2">
        <h2 className="text-black font-semibold">Suppression utilisateur</h2>
        <span onClick={onClose} className="text-gray-600 cursor-pointer">
          x
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <p className="text-gray-500 text-sm">
          Voullez-vous vraiment supprimer{" "}
          <strong className="text-black">{user.name}</strong> matricule : {" "}
          <strong className="text-black">
            {user.matricul}
          </strong>{" "}
          qui est <strong className="text-black">{user.role}</strong>{" "} ?
        </p>

        <input
          type="text"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          placeholder="id"
        />

        <div className="flex justify-end gap-2 my-2">
          <span
            className="hover:bg-gray-100 border border-gray-300 text-gray-900 text-xs py-2 px-6 rounded font-semibold cursor-pointer"
            onClick={onClose}
          >
            Annuler
          </span>
          <button
            type="submit"
            className="bg-red-700 text-white text-xs py-2 px-6 rounded cursor-pointer font-semibold flex justify-center"
            disabled={pending}
          >
            {pending ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              "Supprimer"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteUser;
