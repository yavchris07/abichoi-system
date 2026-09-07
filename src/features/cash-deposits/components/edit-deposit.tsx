import React, { useEffect, useState } from "react";
import {
  ArrowDownLeft,
  CalendarDays,
  CircleDollarSign,
  CreditCard,
  FileText,
  Loader2,
  Wallet,
  X,
} from "lucide-react";

import { useToast } from "../../../components/customer-toast";
import Modal from "../../../components/modal";
import { useEditDeposit } from "../hooks/use-edit-deposit";
import type { Deposit } from "../../../utils/types";

type EditDepositProps = {
  open: boolean;
  onClose: () => void;
  token: string;
  deposit: Deposit;
};

type DepositFormData = {
  id: Deposit["id"];
  deposit_number: string;
  source: string;
  amount: number;
  currency: string;
  description: string;
  created_at: string;
};

const EditDeposit = ({
  onClose,
  open,
  token,
  deposit,
}: EditDepositProps) => {
  const { editDeposit, fail, pending } = useEditDeposit(token);

  const { showToast } = useToast();

  const [formData, setFormData] = useState<DepositFormData>({
    id: deposit.id,
    deposit_number: deposit.deposit_number,
    source: deposit.source,
    amount: Number(deposit.amount),
    currency: deposit.currency,
    description: deposit.description,
    created_at: deposit.created_at?.split("T")[0] ?? "",
  });

  /*
   * Important :
   * Le composant peut rester monté pendant que le dépôt sélectionné
   * change. On recharge donc le formulaire lorsque "deposit" change.
   */
  useEffect(() => {
    if (!deposit) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData({
      id: deposit.id,
      deposit_number: deposit.deposit_number,
      source: deposit.source,
      amount: Number(deposit.amount),
      currency: deposit.currency,
      description: deposit.description,
      created_at: deposit.created_at?.split("T")[0] ?? "",
    });
  }, [deposit]);

  const sources = [
    {
      id: "owner",
      name: "Argent personnel",
    },
    {
      id: "bank",
      name: "Banque",
    },
    {
      id: "other",
      name: "Autre",
    },
  ];

  const currencies = [
    {
      id: "USD",
      name: "Dollar américain (USD)",
    },
    {
      id: "CDF",
      name: "Franc congolais (CDF)",
    },
  ];

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20";

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
      [name]: value,
    }));
  };

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setFormData((prev) => ({
      ...prev,
      amount: value === "" ? 0 : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.deposit_number.trim()) {
      showToast("Le numéro du dépôt est obligatoire.", "error");
      return;
    }

    if (!formData.description.trim()) {
      showToast("Veuillez renseigner le motif du dépôt.", "error");
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

    if (!formData.source) {
      showToast("Veuillez sélectionner la source des fonds.", "error");
      return;
    }

    if (!formData.created_at) {
      showToast("Veuillez sélectionner une date.", "error");
      return;
    }

    try {
      await editDeposit(formData);

      showToast("Dépôt modifié avec succès.", "success");

      onClose();
    } catch (error) {
      console.error(error);

      showToast(
        fail || "Impossible de modifier le dépôt.",
        "error"
      );
    }
  };

  if (!open) return null;

  return (
    <Modal>
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Wallet size={20} />
            </div>

            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Modifier le dépôt
              </h2>

              <p className="mt-0.5 text-xs text-zinc-500">
                Modification d'une entrée de trésorerie.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Security notice */}
        <div className="my-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <ArrowDownLeft
            size={18}
            className="mt-0.5 shrink-0 text-amber-600"
          />

          <div>
            <p className="text-xs font-bold text-amber-800">
              Opération financière
            </p>

            <p className="mt-0.5 text-[11px] leading-5 text-amber-700">
              Une modification peut avoir un impact sur le journal
              des mouvements et le solde de la trésorerie.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Référence */}
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2">
              <FileText size={16} className="text-zinc-500" />

              <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-700">
                Référence
              </h3>
            </div>

            <div>
              <label
                htmlFor="deposit_number"
                className={labelClass}
              >
                Numéro du dépôt{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                id="deposit_number"
                name="deposit_number"
                type="text"
                value={formData.deposit_number}
                onChange={handleChange}
                placeholder="Ex. DEP-2026-001"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Informations générales */}
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2">
              <FileText size={16} className="text-zinc-500" />

              <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-700">
                Informations générales
              </h3>
            </div>

            <div>
              <label
                htmlFor="description"
                className={labelClass}
              >
                Motif <span className="text-red-500">*</span>
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Ex. Alimentation de la caisse"
                rows={3}
                className={`${inputClass} resize-none`}
                required
              />
            </div>
          </div>

          {/* Montant */}
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2">
              <CircleDollarSign
                size={16}
                className="text-zinc-500"
              />

              <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-700">
                Montant
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="amount" className={labelClass}>
                  Montant <span className="text-red-500">*</span>
                </label>

                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.amount || ""}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="currency"
                  className={labelClass}
                >
                  Devise <span className="text-red-500">*</span>
                </label>

                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Sélectionner</option>

                  {currencies.map((currency) => (
                    <option
                      key={currency.id}
                      value={currency.id}
                    >
                      {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Source et date */}
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2">
              <CreditCard
                size={16}
                className="text-zinc-500"
              />

              <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-700">
                Source et date
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="source" className={labelClass}>
                  Source des fonds{" "}
                  <span className="text-red-500">*</span>
                </label>

                <select
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Sélectionner</option>

                  {sources.map((source) => (
                    <option
                      key={source.id}
                      value={source.id}
                    >
                      {source.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="created_at"
                  className={labelClass}
                >
                  Date du dépôt{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <CalendarDays
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  />

                  <input
                    id="created_at"
                    name="created_at"
                    type="date"
                    value={formData.created_at}
                    onChange={handleChange}
                    className={`${inputClass} pl-9`}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-zinc-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="cursor-pointer rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={pending}
              className="flex min-w-[125px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-zinc-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
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
                  <Wallet size={15} />

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

export default EditDeposit;
