
import {
  ArrowDownLeft,
  CalendarDays,
  CreditCard,
  Pencil,
  Plus,
  Trash2,
  Wallet,
} from "lucide-react";

import Loading from "../../../components/loading";
import type { Deposit } from "../../../utils/types";

interface ListDepositProps {
  deposits: Deposit[];
  loading: boolean;
  onDelete: (deposit: Deposit) => void;
  onEdit: (deposit: Deposit) => void;
}

const ListDeposit = ({
  deposits,
  loading,
  onDelete,
  onEdit,
}: ListDepositProps) => {
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

    if (Number.isNaN(value)) return `${amount} ${currency}`;

    return new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + ` ${currency}`;
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case "bank":
        return "Banque";
      case "owner":
        return "Fonds personnel";
      default:
        return "Autre";
    }
  };

  const getSourceClass = (source: string) => {
    switch (source) {
      case "bank":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "owner":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-200";
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-zinc-200 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Wallet size={18} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-zinc-900">
                Dépôts de trésorerie
              </h2>

              <p className="text-xs text-zinc-500">
                Historique des entrées de fonds
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
          <ArrowDownLeft size={15} />
          {deposits.length} dépôt{deposits.length > 1 ? "s" : ""}
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-237.5 w-full text-left">
          <thead className="border-b border-zinc-200 bg-zinc-50">
            <tr className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Numéro</th>
              <th className="px-3 py-2">Motif</th>
              <th className="px-3 py-2">Montant</th>
              <th className="px-3 py-2">Devise</th>
              <th className="px-3 py-2">Source</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {deposits.map((depo) => (
              <tr
                key={depo.id}
                className="group transition-colors hover:bg-amber-50/30"
              >
                {/* Date */}
                <td className="whitespace-nowrap px-2 py-1">
                  <div className="flex items-center gap-2 text-xs text-zinc-600">
                    <CalendarDays
                      size={15}
                      className="text-zinc-400"
                    />

                    <span>{formatDate(depo.created_at)}</span>
                  </div>
                </td>

                {/* Numéro */}
                <td className="whitespace-nowrap px-2 py-1">
                  <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono text-xs font-semibold text-zinc-700">
                    {depo.deposit_number}
                  </span>
                </td>

                {/* Motif */}
                <td className="max-w-65 px-2 py-1">
                  <div
                    className="truncate text-xs font-medium text-zinc-800"
                    title={depo.description}
                  >
                    {depo.description || "Aucun motif"}
                  </div>
                </td>

                {/* Montant */}
                <td className="whitespace-nowrap px-2 py-1">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <Plus size={13} />
                    </div>

                    <span className="text-sm font-bold text-zinc-900">
                      {formatAmount(depo.amount, depo.currency)}
                    </span>
                  </div>
                </td>

                {/* Devise */}
                <td className="whitespace-nowrap px-2 py-1">
                  <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-[11px] font-bold text-zinc-700">
                    {depo.currency}
                  </span>
                </td>

                {/* Source */}
                <td className="whitespace-nowrap px-2 py-1">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${getSourceClass(
                      depo.source
                    )}`}
                  >
                    <CreditCard size={12} />
                    {getSourceLabel(depo.source)}
                  </span>
                </td>

                {/* Actions */}
                <td className="whitespace-nowrap px-2 py-1">
                  <div className="flex justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(depo)}
                      title="Modifier le dépôt"
                      aria-label="Modifier le dépôt"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-amber-100 hover:text-amber-700"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(depo)}
                      title="Supprimer le dépôt"
                      aria-label="Supprimer le dépôt"
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-red-50 hover:text-red-600"
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
      {deposits.length === 0 && (
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
            <Wallet size={25} />
          </div>

          <h3 className="text-sm font-bold text-zinc-800">
            Aucun dépôt enregistré
          </h3>

          <p className="mt-1 max-w-sm text-xs text-zinc-500">
            Les dépôts effectués apparaîtront ici une fois enregistrés.
          </p>
        </div>
      )}

      {/* Footer */}
      {deposits.length > 0 && (
        <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-5 py-3">
          <span className="text-xs text-zinc-500">
            Total :{" "}
            <span className="font-semibold text-zinc-800">
              {deposits.length}
            </span>{" "}
            dépôt{deposits.length > 1 ? "s" : ""}
          </span>

          <span className="text-[11px] text-zinc-400">
            Entrées de trésorerie
          </span>
        </div>
      )}
    </div>
  );
};

export default ListDeposit;


