import { getToken } from "@/utils/get-token";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/customer-toast";
import Modal from "@/components/modal";
import { User } from "@/utils/types";
import { useCreateVisit } from "../hooks/use-create-visit";

type createVisitProps = {
  open: boolean;
  onClose: () => void;
  users: User[];
};

const CreateVisit = ({ onClose, open, users }: createVisitProps) => {
  const token = getToken();
  const { create, fail, pending } = useCreateVisit(token ?? "");

  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: "",
    visitor: "",
    work: "",
    motif: "",
    user: '',
    statut: "",
    hour: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData);
      await create(formData);
      showToast("Création reussie !", "success");
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

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, user: event.target.value });
  };

  if (!open) return null;

  return (
    <Modal>
      <div className="flex justify-between items-center my-2">
        <h2 className="text-black font-semibold">Visite</h2>
        <span onClick={onClose} className="text-gray-600 cursor-pointer">
          x
        </span>
      </div>
      <p className="text-gray-500 text-xs font-medium my-3">
        Ajouter la visite pourque le hote soit notifier de la visite de sa part.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-0">
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Hote</label>
          <select
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            onChange={handleRoleChange}
          >
            <option value="">-- Personne a visiter --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">
            Visiteur
          </label>
          <input
            type="text"
            value={formData.visitor}
            onChange={(e) =>
              setFormData({ ...formData, visitor: e.target.value })
            }
            placeholder="Visiteur"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">
            Occupation
          </label>
          <input
            type="text"
            value={formData.work}
            onChange={(e) => setFormData({ ...formData, work: e.target.value })}
            placeholder="Occupation"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Motif</label>
          <input
            type="text"
            value={formData.motif}
            onChange={(e) =>
              setFormData({ ...formData, motif: e.target.value })
            }
            placeholder="Motif"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="flex justify-end gap-2 my-2">
          <span
            className="hover:bg-gray-100 border border-gray-300 text-gray-900 text-xs py-2 px-6 rounded font-semibold cursor-pointer"
            onClick={onClose}
          >
            Annuler
          </span>
          <button
            type="submit"
            className="bg-amber-500 text-black text-xs py-2 px-6 rounded cursor-pointer font-semibold flex justify-center"
            disabled={pending}
          >
            {pending ? <Loader2 className="animate-spin" size={14} /> : "Ajouter"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateVisit;
