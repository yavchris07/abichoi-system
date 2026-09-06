import React from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  CreditCard,
  Loader2,
  ReceiptText,
  Trash2,
  User,
  Wallet,
  X,
} from "lucide-react";

import { useToast } from "../../../components/customer-toast";
import Modal from "../../../components/modal";
import type { Withdrawal } from "../../../utils/types";
import { useDeletewithdrawal } from "../hooks/use-delete-withdrawal";

type DeleteWithdrawalProps = {
  open: boolean;
  onClose: () => void;
  token: string;
  withdrawal: Withdrawal;
};

const DeleteWithdrawal = ({
  open,
  onClose,
  token,
  withdrawal,
}: DeleteWithdrawalProps) => {
  const { deletewithdrawal, fail, pending } =
    useDeletewithdrawal(token ?? "");

  const { showToast } = useToast();

  const formatAmount = (amount: number | string, currency: string) => {
    return `${new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(amount))} ${currency}`;
  };

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await deletewithdrawal(withdrawal.id);

      showToast("Retrait supprimé avec succès.", "success");

      onClose();
    } catch (e) {
      console.error(e);

      showToast(
        fail || "Impossible de supprimer le retrait.",
        "error"
      );
    }
  };

  if (!open) return null;

  return (
    <Modal>
      <div className="w-full max-w-xl">
      {/* <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"> */}
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Supprimer le retrait
              </h2>

              <p className="mt-0.5 text-xs text-zinc-500">
                Confirmation d'une opération financière
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

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5">
            {/* Warning */}
            <div className="mb-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <AlertTriangle
                size={19}
                className="mt-0.5 shrink-0 text-red-600"
              />

              <div>
                <p className="text-xs font-bold text-red-900">
                  Attention
                </p>

                <p className="mt-1 text-xs leading-5 text-red-800">
                  Cette opération représente une sortie de trésorerie.
                  Vérifiez les informations avant de confirmer la
                  suppression.
                </p>
              </div>
            </div>

            {/* Withdrawal information */}
            <div className="overflow-hidden rounded-xl border border-zinc-200">
              {/* Amount */}
              <div className="border-b border-zinc-100 bg-zinc-50/70 px-4 py-4">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                  Montant du retrait
                </p>

                <div className="flex items-center gap-2">
                  <ArrowUpRight
                    size={18}
                    className="text-red-600"
                  />

                  <span className="text-xl font-bold text-red-600">
                    - {formatAmount(
                      withdrawal.amount,
                      withdrawal.currency
                    )}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 divide-y divide-zinc-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                {/* Number */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <ReceiptText
                    size={16}
                    className="text-zinc-400"
                  />

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase text-zinc-400">
                      Numéro
                    </p>

                    <p className="truncate text-xs font-semibold text-zinc-800">
                      {withdrawal.withdrawal_number || "-"}
                    </p>
                  </div>
                </div>

                {/* Beneficiary */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <User
                    size={16}
                    className="text-zinc-400"
                  />

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase text-zinc-400">
                      Bénéficiaire
                    </p>

                    <p className="truncate text-xs font-semibold text-zinc-800">
                      {withdrawal.beneficiary || "-"}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <CalendarDays
                    size={16}
                    className="text-zinc-400"
                  />

                  <div>
                    <p className="text-[10px] font-semibold uppercase text-zinc-400">
                      Date
                    </p>

                    <p className="text-xs font-semibold text-zinc-800">
                      {formatDate(withdrawal.created_at)}
                    </p>
                  </div>
                </div>

                {/* Currency */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <CreditCard
                    size={16}
                    className="text-zinc-400"
                  />

                  <div>
                    <p className="text-[10px] font-semibold uppercase text-zinc-400">
                      Devise
                    </p>

                    <p className="text-xs font-semibold text-zinc-800">
                      {withdrawal.currency}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div className="border-t border-zinc-100 px-4 py-3">
                <div className="flex items-start gap-3">
                  <Wallet
                    size={16}
                    className="mt-0.5 shrink-0 text-zinc-400"
                  />

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase text-zinc-400">
                      Motif
                    </p>

                    <p className="mt-1 text-xs leading-5 text-zinc-700">
                      {withdrawal.reason || "Aucun motif renseigné"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation text */}
            <p className="mt-5 text-center text-xs leading-5 text-zinc-500">
              Voulez-vous vraiment supprimer le retrait{" "}
              <strong className="font-bold text-zinc-800">
                {withdrawal.withdrawal_number}
              </strong>{" "}
              ?
            </p>
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
              className="flex min-w-31.25 items-center justify-center gap-2 rounded-lg bg-red-700 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                  Suppression...
                </>
              ) : (
                <>
                  <Trash2 size={15} />
                  Supprimer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteWithdrawal;
