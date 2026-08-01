import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "../../../components/customer-toast";
import Modal from "../../../components/modal";
import { getCurrentUser } from "../../../utils/get-current-user";
import type { Withdrawal } from "../../../utils/types";
import { useEditwithdrawal } from "../hooks/use-edit-withdrawal";

type editWithdrawalProps = {
  open: string;
  onClose: () => void;
  token: string;
  withdrawal: Withdrawal;
};

const EditWithdrawal = ({
  open,
  onClose,
  token,
  withdrawal,
}: editWithdrawalProps) => {
  const { showToast } = useToast();
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    id: withdrawal.id,
    withdrawal_number: withdrawal.withdrawal_number,
    amount: withdrawal.amount,
    currency: withdrawal.currency,
    beneficiary: withdrawal.beneficiary,
    reason: withdrawal.reason,
    user_id: user.id,
  });

  const { editwithdrawal, fail, pending } = useEditwithdrawal(token ?? "");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editwithdrawal(formData);
      showToast("Édition réussie !", "success");
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

  const devises = [
    { id: "USD", name: "USD" },
    { id: "CDF", name: "CDF" },
  ];

  const handleDeviseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, currency: event.target.value });
  };

  if (!open) return null;
  return (
    <Modal>
      <div className="flex justify-between items-center my-2">
        <h2 className="text-black font-semibold">Editer Retrait</h2>
        <span onClick={onClose} className="text-gray-600 cursor-pointer">
          x
        </span>
      </div>
      <p className="text-gray-500 text-xs font-medium my-3">
        Les retraits sont conditionnés par une jistification.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-0">
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">ID</label>
          <input
            type="text"
            value={formData.withdrawal_number}
            onChange={(e) =>
              setFormData({ ...formData, withdrawal_number: e.target.value })
            }
            placeholder="Withdrawal num"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Motif</label>
          <input
            type="text"
            value={formData.reason}
            onChange={(e) =>
              setFormData({ ...formData, reason: e.target.value })
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
            value={formData.currency}
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
            Bénéficiaire
          </label>
          <input
            type="text"
            value={formData.beneficiary}
            onChange={(e) =>
              setFormData({ ...formData, beneficiary: e.target.value })
            }
            placeholder="Bénéficiaire"
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
              "Modifier"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditWithdrawal;
