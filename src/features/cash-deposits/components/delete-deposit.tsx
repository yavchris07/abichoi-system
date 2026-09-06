import {
  AlertTriangle,
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
import type { Deposit } from "../../../utils/types";
import { useDeleteDeposit } from "../hooks/use-delete-deposit";

type DeleteDepositProps = {
  open: boolean;
  onClose: () => void;
  token: string;
  deposit: Deposit;
};

const DeleteDeposit = ({
  onClose,
  open,
  token,
  deposit,
}: DeleteDepositProps) => {
  const { deleteDeposit, fail, pending } = useDeleteDeposit(token);

  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await deleteDeposit(deposit.id);

      showToast("Dépôt supprimé avec succès.", "success");

      onClose();
    } catch (error) {
      console.error(error);

      showToast(
        fail || "Impossible de supprimer le dépôt.",
        "error"
      );
    }
  };

  if (!open) return null;

  const formatAmount = (amount: number | string, currency: string) => {
    const value = Number(amount);

    if (Number.isNaN(value)) {
      return `${amount} ${currency}`;
    }

    return (
      new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value) + ` ${currency}`
    );
  };

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case "owner":
        return "Argent personnel";
      case "bank":
        return "Banque";
      default:
        return "Autre";
    }
  };

  return (
    <Modal>
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <Trash2 size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Supprimer le dépôt
              </h2>

              <p className="mt-0.5 text-xs text-zinc-500">
                Cette opération concerne la trésorerie.
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

        {/* Warning */}
        <div className="my-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-2">
          <AlertTriangle
            size={19}
            className="mt-0.5 shrink-0 text-red-600"
          />

          <div>
            <p className="text-xs font-bold text-red-800">
              Attention
            </p>

            <p className="mt-1 text-xs leading-5 text-red-700">
              Vous êtes sur le point de supprimer une opération
              financière. Cette action peut avoir un impact sur le
              journal des mouvements et le solde de la trésorerie.
            </p>
          </div>
        </div>

        {/* Deposit details */}
        <div className="overflow-hidden rounded-xl border border-zinc-200">
          <div className="border-b border-zinc-200 bg-zinc-50 px-3 py-2">
            <div className="flex items-center gap-2">
              <Wallet size={15} className="text-zinc-500" />

              <span className="text-xs font-bold text-zinc-700">
                Détails du dépôt
              </span>
            </div>
          </div>

          <div className="divide-y divide-zinc-100">
            {/* Number */}
            <div className="flex items-center justify-between gap-4 px-3 py-2">
              <div className="flex items-center gap-2 text-zinc-500">
                <ReceiptText size={14} />

                <span className="text-xs">
                  Numéro
                </span>
              </div>

              <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono text-xs font-semibold text-zinc-800">
                {deposit.deposit_number}
              </span>
            </div>

            {/* Amount */}
            <div className="flex items-center justify-between gap-4 px-3 py-2">
              <div className="flex items-center gap-2 text-zinc-500">
                <CreditCard size={14} />

                <span className="text-xs">
                  Montant
                </span>
              </div>

              <span className="text-sm font-bold text-zinc-900">
                {formatAmount(
                  deposit.amount,
                  deposit.currency
                )}
              </span>
            </div>

            {/* Source */}
            <div className="flex items-center justify-between gap-4 px-3 py-2">
              <div className="flex items-center gap-2 text-zinc-500">
                <User size={14} />

                <span className="text-xs">
                  Source
                </span>
              </div>

              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-semibold text-zinc-700">
                {getSourceLabel(deposit.source)}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center justify-between gap-4 px-3 py-2">
              <div className="flex items-center gap-2 text-zinc-500">
                <CalendarDays size={14} />

                <span className="text-xs">
                  Date
                </span>
              </div>

              <span className="text-xs font-medium text-zinc-800">
                {formatDate(deposit.created_at)}
              </span>
            </div>

            {/* Description */}
            <div className="px-3 py-2">
              <span className="text-[11px] font-semibold text-zinc-400">
                Motif
              </span>

              <p className="mt-1 text-xs font-medium text-zinc-800">
                {deposit.description || "Aucun motif"}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mt-5 flex justify-end gap-2 border-t border-zinc-200 pt-4">
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
              className="flex min-w-31.25 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
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

export default DeleteDeposit;

