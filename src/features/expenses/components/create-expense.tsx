import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { getToken } from "../../../utils/get-token";
import { useToast } from "../../../components/customer-toast";
import Modal from "../../../components/modal";
import { useCreateExpense } from "../hooks/use-create-expense";
import type { ExpenseCategory } from "../../../utils/types";
import { getCurrentUser } from "../../../utils/get-current-user";

type createExpenseProps = {
  open: string;
  onClose: () => void;
  categories: ExpenseCategory[];
};

const CreateExpense = ({ onClose, open, categories }: createExpenseProps) => {
  const token = getToken();
  const user = getCurrentUser();
  const { create, fail, pending } = useCreateExpense(token ?? "");

  // console.log('WWWWWWWWWWW ',user)

  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: 0,
    expense_number: "",
    voucher_number: "",
    category_id: 0,
    user_id: user.id,
    beneficiary: "",
    amount: 0,
    currency: "",
    payment_method: "",
    description: "",
    created_at:"",
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

  const methods = [
    { id: "cash", name: "Cash, en espece" },
    { id: "mobile_money", name: "Mobile money" },
    { id: "bank", name: "Par la banque" },
  ];
  const devises = [
    { id: "USD", name: "USD" },
    { id: "CDF", name: "CDF" },
  ];

  const handleMethodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, payment_method: event.target.value });
  };

  const handleDeviseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, currency: event.target.value });
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, category_id: Number(event.target.value) });
  };

  if (!open) return null;

  return (
    <Modal>
      <div className="flex justify-between items-center my-2">
        <h2 className="text-black font-semibold">Création Dépense</h2>
        <span onClick={onClose} className="text-gray-600 cursor-pointer">
          x
        </span>
      </div>
      <p className="text-gray-500 text-xs font-medium my-3">
        Faite une dépense.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-0">
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Numéro pièce</label>
          <input
            type="text"
            value={formData.voucher_number}
            onChange={(e) =>
              setFormData({ ...formData, voucher_number: e.target.value })
            }
            placeholder="Numéro pièce"
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
          <label className="text-gray-900 text-xs font-semibold">
            Méthode de paiement
          </label>
          <select
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            onChange={handleMethodeChange}
          >
            <option value="">-- Méthode de paiement --</option>
            {methods.map((meth) => (
              <option key={meth.id} value={meth.id}>
                {meth.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">
            Type dépense
          </label>
          <select
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            onChange={handleCategoryChange}
          >
            <option value="">-- Type dépense --</option>
            {categories.map((ct) => (
              <option key={ct.id} value={ct.id}>
                {ct.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">
            bénéficiaire
          </label>
          <input
            type="text"
            value={formData.beneficiary}
            onChange={(e) =>
              setFormData({ ...formData, beneficiary: e.target.value })
            }
            placeholder="bénéficiaire"
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
            {pending ? <Loader2 className="animate-spin" size={14} /> : "Créer"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateExpense;
