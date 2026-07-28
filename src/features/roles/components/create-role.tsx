import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useCreateRole } from "../hooks/use-create-role";
import { getToken } from "../../../utils/get-token";
import { useToast } from "../../../components/customer-toast";

type createRoleProps = {
  open: string;
  onClose: () => void;
};

const CreateRole = ({ open, onClose }: createRoleProps) => {
  const token = getToken();
  const { create, fail, pending } = useCreateRole(token ?? "");

  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
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


  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-50 p-4 rounded w-112.5 shadow-sm">
        <div className="flex justify-between items-center my-2">
          <h2 className="text-black font-semibold">Création Role</h2>
          <span onClick={onClose} className="text-gray-600 cursor-pointer">
            x
          </span>
        </div>
        <p className="text-gray-500 text-xs font-medium my-3">
          Ajouter un role pour gere l&apos;espace de travail.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-0">
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">
              ID
            </label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) =>
                setFormData({ ...formData, id: e.target.value })
              }
              placeholder="Nom"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div>
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">
              Nom
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Matricule"
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
              {pending ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                "Créer"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRole;
