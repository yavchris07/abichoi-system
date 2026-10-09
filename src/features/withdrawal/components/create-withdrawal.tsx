import React, { useState } from "react";
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
import { useCreatewithdrawal } from "../hooks/use-create-withdrawal";

type CreateWithdrawalProps = {
  open: boolean;
  onClose: () => void;
  token: string;
};

export type WithdrawalFormData = {
  amount: number;
  currency: string;
  beneficiary: string;
  reason: string;
  created_at: string;
};

const CreateWithdrawal = ({
  open,
  onClose,
  token,
}: CreateWithdrawalProps) => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState<WithdrawalFormData>({
    amount: 0,
    currency: "",
    beneficiary: "",
    reason: "",
    created_at: new Date().toISOString().split("T")[0],
  });

  const { create, fail, pending } = useCreatewithdrawal(token ?? "");

  const devises = [
    { id: "USD", name: "Dollar américain (USD)" },
    { id: "CDF", name: "Franc congolais (CDF)" },
  ];

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
      await create(formData);

      showToast("Retrait créé avec succès.", "success");

      setFormData({
        amount: 0,
        currency: "",
        beneficiary: "",
        reason: "",
        created_at: new Date().toISOString().split("T")[0],
      });

      onClose();
    } catch (e) {
      console.error(e);

      showToast(
        fail || "Une erreur est survenue lors de la création du retrait.",
        "error"
      );
    }
  };

  if (!open) return null;

  return (
    <Modal>
      <div className="w-full max-w-xl">
      {/* <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"> */}
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <ArrowUpRight size={20} />
            </div>

            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Nouveau retrait
              </h2>

              <p className="mt-0.5 text-xs text-zinc-500">
                Enregistrer une sortie de trésorerie
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Warning */}
        <div className="mx-6 mt-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <Wallet
            size={18}
            className="mt-0.5 shrink-0 text-amber-600"
          />

          <div>
            <p className="text-xs font-bold text-amber-900">
              Justification obligatoire
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-800">
              Chaque retrait doit être associé à un bénéficiaire et à
              un motif précis afin de garantir la traçabilité des
              opérations financières.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
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
                    Bénéficiaire <span className="text-red-500">*</span>
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
                    Date du retrait <span className="text-red-500">*</span>
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
                  Montant du retrait
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Montant */}
                <div>
                  <label className={labelClass}>
                    Montant <span className="text-red-500">*</span>
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
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>

                {/* Devise */}
                <div>
                  <label className={labelClass}>
                    Devise <span className="text-red-500">*</span>
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
                      <option value="">-- Sélectionner --</option>

                      {devises.map((devise) => (
                        <option key={devise.id} value={devise.id} className="text-sm">
                          {devise.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Motif */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-amber-500" />

                <h3 className="text-sm font-bold text-zinc-900">
                  Justification
                </h3>
              </div>

              <div>
                <label className={labelClass}>
                  Motif du retrait <span className="text-red-500">*</span>
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
                  Décrivez clairement l'utilisation prévue des fonds.
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
              className="flex min-w-30 items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold text-zinc-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <ArrowUpRight size={15} />
                  Retirer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateWithdrawal;
