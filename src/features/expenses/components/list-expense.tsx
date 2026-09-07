import {
  CalendarDays,
  CreditCard,
  Pencil,
  ReceiptText,
  Trash2,
} from "lucide-react";

import Loading from "../../../components/loading";
import EmptyList from "../../../components/empty-list";
import type { Expense } from "../../../utils/types";

interface ListExpenseProps {
  expenses: Expense[];
  loading: boolean;
  onDelete: (expense: Expense) => void;
  onEdit: (expense: Expense) => void;
}

const ListExpense = ({
  loading,
  onDelete,
  onEdit,
  expenses,
}: ListExpenseProps) => {
  if (loading) {
    return <Loading />;
  }

  if (!expenses || expenses.length === 0) {
    return <EmptyList />;
  }

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

    return `${value.toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} ${currency}`;
  };

  const getPaymentMethod = (method: string) => {
    switch (method) {
      case "bank":
        return {
          label: "Banque",
          className: "bg-blue-50 text-blue-700 border-blue-100",
        };

      case "cash":
        return {
          label: "Cash",
          className: "bg-amber-50 text-amber-700 border-amber-100",
        };

      case "mobile_money":
      case "mobile money":
        return {
          label: "Mobile Money",
          className: "bg-purple-50 text-purple-700 border-purple-100",
        };

      default:
        return {
          label: method || "Inconnu",
          className: "bg-gray-50 text-gray-600 border-gray-100",
        };
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
            <ReceiptText size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Dépenses
            </h2>
            <p className="text-xs text-gray-500">
              Historique des dépenses enregistrées
            </p>
          </div>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {expenses.length} dépense{expenses.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-250 text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Numéro</th>
              <th className="px-3 py-2">Motif</th>
              <th className="px-3 py-2 text-right">Montant</th>
              <th className="px-3 py-2">Paiement</th>
              <th className="px-3 py-2">Référence</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {expenses.map((exp) => {
              const payment = getPaymentMethod(exp.payment_method);

              return (
                <tr
                  key={exp.id}
                  className="group transition-colors hover:bg-amber-50/30"
                >
                  {/* Date */}
                  <td className="whitespace-nowrap px-2 py-1">
                    <div className="flex items-center gap-2">
                      <CalendarDays
                        size={14}
                        className="text-gray-400"
                      />

                      <span className="text-xs font-medium text-gray-700">
                        {formatDate(exp.created_at)}
                      </span>
                    </div>
                  </td>

                  {/* Expense number */}
                  <td className="whitespace-nowrap px-2 py-1">
                    <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                      {exp.expense_number}
                    </span>
                  </td>

                  {/* Description */}
                  <td className="max-w-70 px-2 py-1">
                    <p
                      className="truncate text-xs font-medium text-gray-900"
                      title={exp.description}
                    >
                      {exp.description || "Sans description"}
                    </p>
                  </td>

                  {/* Amount */}
                  <td className="whitespace-nowrap px-2 py-1 text-right">
                    <span className="text-sm font-bold text-gray-900">
                      {formatAmount(exp.amount, exp.currency)}
                    </span>
                  </td>

                  {/* Payment method */}
                  <td className="whitespace-nowrap px-2 py-1">
                    <div
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${payment.className}`}
                    >
                      <CreditCard size={12} />
                      {payment.label}
                    </div>
                  </td>

                  {/* Reference */}
                  <td className="px-2 py-1">
                    <span
                      className="block max-w-37.5 truncate font-mono text-[11px] text-gray-500"
                      title={String(exp.id)}
                    >
                      {exp.id}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-2 py-1">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(exp)}
                        title="Modifier la dépense"
                        aria-label="Modifier la dépense"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-amber-100 hover:text-amber-700"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(exp)}
                        title="Supprimer la dépense"
                        aria-label="Supprimer la dépense"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50/70 px-3 py-2">
        <span className="text-xs text-gray-500">
          Total : <strong className="text-gray-700">{expenses.length}</strong>{" "}
          enregistrement{expenses.length > 1 ? "s" : ""}
        </span>

        <span className="text-[11px] text-gray-400">
          Les opérations sont enregistrées dans le journal financier
        </span>
      </div>
    </div>
  );
};

export default ListExpense;

