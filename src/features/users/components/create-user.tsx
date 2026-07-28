import { useState } from "react";
import { getToken } from "../../../utils/get-token";
import { useCreateUser } from "../hooks/use-create-user";
import { useToast } from "../../../components/customer-toast";
import type { Role } from "../../../utils/types";
import { Loader2 } from "lucide-react";

type createUserProps = {
  open: string;
  onClose: () => void;
  roleItems: Role[];
};

const CreateUser = ({ open, onClose, roleItems }: createUserProps) => {
  const token = getToken();
  const { create, fail, pending } = useCreateUser(token ?? "");

  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    passcode: "",
    role: "",
    adress: "",
    matricul: "",
    nin: "",
    email: "",
    is_active: 1,
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

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, role: event.target.value });
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-50 p-4 rounded w-112.5 shadow-sm">
        <div className="flex justify-between items-center my-2">
          <h2 className="text-black font-semibold">Création utilisateur</h2>
          <span onClick={onClose} className="text-gray-600 cursor-pointer">
            x
          </span>
        </div>
        <p className="text-gray-500 text-xs font-medium my-3">
          Ajouter un utilisateur et assigne lui un role correspondant a son
          space de travail.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-0">
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">
              Nom complet
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, nin: e.target.value })
              }
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
            <label className="text-gray-900 text-xs font-semibold">
              Mot de passe
            </label>
            <input
              type="password"
              value={formData.passcode}
              onChange={(e) =>
                setFormData({ ...formData, passcode: e.target.value })
              }
              placeholder="••••••••"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div>
          <div className="w-full my-2">
            <label className="text-gray-900 text-xs font-semibold">
              Adresse
            </label>
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
            <label className="text-gray-900 text-xs font-semibold">Role</label>
            <select
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
              onChange={handleRoleChange}
            >
              <option value="">-- Choix role --</option>
              {roleItems.map((rol) => (
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
                "Créer"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
