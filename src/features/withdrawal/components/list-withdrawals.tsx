import {
  ArrowUpRight,
  CalendarDays,
  Pencil,
  ReceiptText,
  Trash2,
  User,
  Wallet,
} from "lucide-react";

import Loading from "../../../components/loading";
import type { Withdrawal } from "../../../utils/types";

interface ListWithdrawalsProps {
  withdrawals: Withdrawal[];
  loading: boolean;
  onDelete: (withdrawal: Withdrawal) => void;
  onEdit: (withdrawal: Withdrawal) => void;
}

const ListWithdrawals = ({
  withdrawals,
  loading,
  onDelete,
  onEdit,
}: ListWithdrawalsProps) => {
  if (loading) return <Loading />;

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

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

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-zinc-200 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <Wallet size={18} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-zinc-900">
              Retraits de trésorerie
            </h2>

            <p className="text-xs text-zinc-500">
              Historique des sorties de fonds
            </p>
          </div>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
          <ArrowUpRight size={15} />
          {withdrawals.length} retrait
          {withdrawals.length > 1 ? "s" : ""}
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-262.5 w-full text-left">
          <thead className="border-b border-zinc-200 bg-zinc-50">
            <tr className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              <th className="px-3 py-2">Date</th>

              <th className="px-3 py-2">Numéro</th>

              <th className="px-3 py-2">Motif</th>

              <th className="px-3 py-2">Montant</th>

              <th className="px-3 py-2">Devise</th>

              <th className="px-3 py-2">Bénéficiaire</th>

              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {withdrawals.map((withdrawal) => (
              <tr
                key={withdrawal.id}
                className="group transition-colors hover:bg-red-50/20"
              >
                {/* Date */}
                <td className="whitespace-nowrap px-2 py-1">
                  <div className="flex items-center gap-2 text-xs text-zinc-600">
                    <CalendarDays size={15} className="text-zinc-400" />

                    <span>{formatDate(withdrawal.created_at)}</span>
                  </div>
                </td>

                {/* Numéro */}
                <td className="whitespace-nowrap px-2 py-1">
                  <div className="flex items-center gap-2">
                    <ReceiptText size={14} className="text-zinc-400" />

                    <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono text-xs font-semibold text-zinc-700">
                      {withdrawal.withdrawal_number}
                    </span>
                  </div>
                </td>

                {/* Motif */}
                <td className="max-w-[250px] px-2 py-1">
                  <span
                    className="block truncate text-xs font-medium text-zinc-800"
                    title={withdrawal.reason}
                  >
                    {withdrawal.reason || "Aucun motif"}
                  </span>
                </td>

                {/* Montant */}
                <td className="whitespace-nowrap px-2 py-1">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
                      <ArrowUpRight size={15} />
                    </div>

                    <span className="text-sm font-bold text-red-700">
                      - {formatAmount(withdrawal.amount, withdrawal.currency)}
                    </span>
                  </div>
                </td>

                {/* Devise */}
                <td className="whitespace-nowrap px-2 py-1">
                  <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-[11px] font-bold text-zinc-700">
                    {withdrawal.currency}
                  </span>
                </td>

                {/* Bénéficiaire */}
                <td className="max-w-[220px] px-2 py-1">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
                      <User size={14} />
                    </div>

                    <span
                      className="truncate text-xs font-semibold text-zinc-800"
                      title={withdrawal.beneficiary}
                    >
                      {withdrawal.beneficiary || "-"}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="whitespace-nowrap px-2 py-1">
                  <div className="flex justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(withdrawal)}
                      title="Modifier le retrait"
                      aria-label="Modifier le retrait"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition hover:bg-amber-100 hover:text-amber-700"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(withdrawal)}
                      title="Supprimer le retrait"
                      aria-label="Supprimer le retrait"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {withdrawals.length === 0 && (
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
            <Wallet size={25} />
          </div>

          <h3 className="text-sm font-bold text-zinc-800">
            Aucun retrait enregistré
          </h3>

          <p className="mt-1 max-w-sm text-xs text-zinc-500">
            Les retraits effectués apparaîtront ici une fois enregistrés.
          </p>
        </div>
      )}

      {/* Footer */}
      {withdrawals.length > 0 && (
        <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-3 py-2">
          <span className="text-xs text-zinc-500">
            Total :{" "}
            <span className="font-semibold text-zinc-800">
              {withdrawals.length}
            </span>{" "}
            retrait{withdrawals.length > 1 ? "s" : ""}
          </span>

          <span className="text-[11px] text-zinc-400">
            Sorties de trésorerie
          </span>
        </div>
      )}
    </div>
  );
};

export default ListWithdrawals;
