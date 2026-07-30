import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "../../../components/customer-toast";
import Modal from "../../../components/modal";
import { useCreateDeposit } from "../hooks/use-create-deposit";

type createDepositProps = {
  open: string;
  onClose: () => void;
  token: string;
};

const CreateDeposit = ({ onClose, open, token }: createDepositProps) => {
  const { create, fail, pending } = useCreateDeposit(token ?? "");

  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: 0,
    deposit_number: "",
    source: "",
    amount: 0,
    currency: "",
    description: "",
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

  const sources = [
    { id: "owner", name: "Argent personnel" },
    { id: "bank", name: "Par la banque" },
    { id: "other", name: "Autre" },
  ];
  const devises = [
    { id: "USD", name: "USD" },
    { id: "CDF", name: "CDF" },
  ];

  const handleSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, source: event.target.value });
  };

  const handleDeviseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, currency: event.target.value });
  };

  if (!open) return null;

  return (
    <Modal>
      <div className="flex justify-between items-center my-2">
        <h2 className="text-black font-semibold">Création Dépot</h2>
        <span onClick={onClose} className="text-gray-600 cursor-pointer">
          x
        </span>
      </div>
      <p className="text-gray-500 text-xs font-medium my-3">
        Faites un dépot pour alimenter la caisse.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-0">
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">ID</label>
          <input
            type="text"
            value={formData.deposit_number}
            onChange={(e) =>
              setFormData({ ...formData, deposit_number: e.target.value })
            }
            placeholder="Expense num"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Motif</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Motif"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Montant</label>
          <input
            type="text"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: Number(e.target.value) })
            }
            placeholder="Montant"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Devise</label>
          <select
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            onChange={handleDeviseChange}
          >
            <option value="">-- Devise --</option>
            {devises.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Source</label>
          <select
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            onChange={handleSourceChange}
          >
            <option value="">-- Source d'argents --</option>
            {sources.map((meth) => (
              <option key={meth.id} value={meth.id}>
                {meth.name}
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
            {pending ? <Loader2 className="animate-spin" size={14} /> : "Déposer"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateDeposit;
