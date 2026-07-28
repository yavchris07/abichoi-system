import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useUpdateUser } from "../hooks/use-update-user";
import type { User } from "../../../utils/types";
import { getToken } from "../../../utils/get-token";
import { useToast } from "../../../components/customer-toast";
import Modal from "../../../components/modal";

type modalProps = {
  open: string;
  onClose: () => void;
  user: User;
  choice: { id: string; name: string }[];
};

const EditUser = ({ open, onClose, user, choice }: modalProps) => {
  const token = getToken();
  const { updateUser, fail, pending } = useUpdateUser(token ?? "");
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    phone: user.phone,
    passcode: user.passcode,
    role: user.role,
    adress: user.adress,
    matricul: user.matricul,
    nin: user.nin,
    email: user.email,
    is_active: user.is_active,
  });

  const states = [
    { id: 1, name: "Actif" },
    { id: 0, name: "Désactivé" },
  ];

  console.log("rrr == : ", choice);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("XX==XX :", formData);
      await updateUser(formData);
      showToast("Mise a jour reussie !", "success");
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
    setFormData({ ...formData, role: event.target.value });
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, is_active: parseInt(event.target.value) });
  };

  if (!open) return null;
  return (
    <Modal>
      <div className="flex justify-between items-center my-2">
        <h2 className="text-black font-semibold">Editer utilisateur</h2>
        <span onClick={onClose} className="text-gray-600 cursor-pointer">
          x
        </span>
      </div>
      <p className="text-gray-500 text-xs font-medium my-3">
        Editer utilisateur, modifier comme bon vous semble.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-0">
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">
            Nom complet
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nom"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">
            Matricule
          </label>
          <input
            type="text"
            value={formData.matricul}
            onChange={(e) =>
              setFormData({ ...formData, matricul: e.target.value })
            }
            placeholder="Matricule"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">
            Numéro ID
          </label>
          <input
            type="text"
            value={formData.nin}
            onChange={(e) => setFormData({ ...formData, nin: e.target.value })}
            placeholder="Numéro ID"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">
            Numéro de téléphone
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Numéro de téléphone"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-2">
          <label className="text-gray-900 text-xs font-semibold">Adresse</label>
          <input
            type="text"
            value={formData.adress}
            onChange={(e) =>
              setFormData({ ...formData, adress: e.target.value })
            }
            placeholder="Adresse"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Etat</label>
          <select
          value={formData.is_active}
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            onChange={handleStateChange}
          >
            {states.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Role</label>
          <select
            value={formData.role}
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            onChange={handleRoleChange}
          >
            {choice.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.name}
              </option>
            ))}
          </select>
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
              "Editer"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUser;
