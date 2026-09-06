import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CreditCard,
  FileText,
  Loader2,
  User,
  Wallet,
  X,
} from "lucide-react";

import { useToast } from "../../../components/customer-toast";
import Modal from "../../../components/modal";
import type { Withdrawal } from "../../../utils/types";
import { useEditwithdrawal } from "../hooks/use-edit-withdrawal";

type EditWithdrawalProps = {
  open: boolean;
  onClose: () => void;
  token: string;
  withdrawal: Withdrawal;
};

type WithdrawalFormData = {
  id: Withdrawal["id"];
  withdrawal_number: string;
  amount: number;
  currency: string;
  beneficiary: string;
  reason: string;
  created_at: string;
};

const EditWithdrawal = ({
  open,
  onClose,
  token,
  withdrawal,
}: EditWithdrawalProps) => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState<WithdrawalFormData>({
    id: withdrawal.id,
    withdrawal_number: withdrawal.withdrawal_number,
    amount: Number(withdrawal.amount),
    currency: withdrawal.currency,
    beneficiary: withdrawal.beneficiary,
    reason: withdrawal.reason,
    created_at: withdrawal.created_at?.split("T")[0] ?? "",
  });

  const { editwithdrawal, fail, pending } =
    useEditwithdrawal(token ?? "");

  const devises = [
    { id: "USD", name: "Dollar américain (USD)" },
    { id: "CDF", name: "Franc congolais (CDF)" },
  ];

  /**
   * Resynchronise le formulaire lorsque le retrait sélectionné change.
   */
  useEffect(() => {
    if (!withdrawal) return;

    setFormData({
      id: withdrawal.id,
      withdrawal_number: withdrawal.withdrawal_number,
      amount: Number(withdrawal.amount),
      currency: withdrawal.currency,
      beneficiary: withdrawal.beneficiary,
      reason: withdrawal.reason,
      created_at: withdrawal.created_at?.split("T")[0] ?? "",
    });
  }, [withdrawal]);

  const inputClass =
    "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10";

  const labelClass =
    "mb-1.5 block text-xs font-semibold text-zinc-700";

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.beneficiary.trim()) {
      showToast("Veuillez renseigner le bénéficiaire.", "error");
      return;
    }

    if (!formData.reason.trim()) {
      showToast("Veuillez renseigner le motif du retrait.", "error");
      return;
    }

    if (!formData.amount || formData.amount <= 0) {
      showToast("Le montant doit être supérieur à 0.", "error");
      return;
    }

    if (!formData.currency) {
      showToast("Veuillez sélectionner une devise.", "error");
      return;
    }

    if (!formData.created_at) {
      showToast("Veuillez renseigner la date du retrait.", "error");
      return;
    }

    try {
      await editwithdrawal(formData);

      showToast("Retrait modifié avec succès.", "success");

      onClose();
    } catch (e) {
      console.error(e);

      showToast(
        fail || "Impossible de modifier le retrait.",
        "error"
      );
    }
  };

  if (!open) return null;

  return (
    <Modal>
      <div className="w-full max-w-xl  ">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <ArrowUpRight size={20} />
            </div>

            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Modifier le retrait
              </h2>

              <p className="mt-0.5 text-xs text-zinc-500">
                Mettre à jour les informations de l'opération
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:opacity-50"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Financial warning */}
        <div className="mx-6 mt-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
          <Wallet
            size={18}
            className="mt-0.5 shrink-0 text-amber-600"
          />

          <div>
            <p className="text-xs font-bold text-amber-900">
              Opération financière
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-800">
              Toute modification du montant ou de la devise peut
              modifier le solde de la trésorerie. Les changements sont
              enregistrés dans le journal financier.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="max-h-[70vh] overflow-y-auto px-3 py-2">
            {/* Référence */}
            <div className="mb-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-amber-500" />

                <h3 className="text-sm font-bold text-zinc-900">
                  Référence
                </h3>
              </div>

              <div>
                <label className={labelClass}>
                  Numéro du retrait
                </label>

                <input
                  type="text"
                  value={formData.withdrawal_number}
                  disabled
                  className={`${inputClass} cursor-not-allowed bg-zinc-50 text-zinc-500`}
                />

                <p className="mt-1.5 text-[11px] text-zinc-400">
                  Le numéro de retrait est une référence générée par
                  le système et ne peut pas être modifié.
                </p>
              </div>
            </div>

            {/* Informations générales */}
            <div className="mb-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-amber-500" />

                <h3 className="text-sm font-bold text-zinc-900">
                  Informations générales
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Bénéficiaire */}
                <div>
                  <label className={labelClass}>
                    Bénéficiaire{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    />

                    <input
                      type="text"
                      name="beneficiary"
                      value={formData.beneficiary}
                      onChange={handleChange}
                      placeholder="Nom du bénéficiaire"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className={labelClass}>
                    Date du retrait{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    />

                    <input
                      type="date"
                      name="created_at"
                      value={formData.created_at}
                      onChange={handleChange}
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Montant */}
            <div className="mb-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-amber-500" />

                <h3 className="text-sm font-bold text-zinc-900">
                  Montant
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Amount */}
                <div>
                  <label className={labelClass}>
                    Montant{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <Wallet
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    />

                    <input
                      type="number"
                      name="amount"
                      value={formData.amount || ""}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>

                {/* Currency */}
                <div>
                  <label className={labelClass}>
                    Devise{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <CreditCard
                      size={16}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    />

                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none pl-9`}
                    >
                      <option value="">
                        -- Sélectionner --
                      </option>

                      {devises.map((devise) => (
                        <option
                          key={devise.id}
                          value={devise.id}
                        >
                          {devise.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Justification */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-amber-500" />

                <h3 className="text-sm font-bold text-zinc-900">
                  Justification
                </h3>
              </div>

              <div>
                <label className={labelClass}>
                  Motif du retrait{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <FileText
                    size={16}
                    className="absolute left-3 top-3 text-zinc-400"
                  />

                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Expliquez la raison du retrait..."
                    rows={4}
                    className={`${inputClass} resize-none pl-9`}
                  />
                </div>

                <p className="mt-1.5 text-[11px] text-zinc-400">
                  Conservez une justification suffisamment précise
                  pour assurer la traçabilité de l'opération.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-zinc-100 bg-zinc-50/70 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={pending}
              className="flex min-w-31.25 items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold text-zinc-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                  Modification...
                </>
              ) : (
                <>
                  <ArrowUpRight size={15} />
                  Modifier
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditWithdrawal;

