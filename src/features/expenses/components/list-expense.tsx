// import { Pencil, Trash2 } from "lucide-react";
// import Loading from "../../../components/loading";
// import type { Expense } from "../../../utils/types";

// interface listExpenseProps {
//   expenses: Expense[];
//   loading: boolean;
//   onDelete: (user: Expense) => void;
//   onEdit: (user: Expense) => void;
// }

// const ListExpense = ({
//   loading,
//   onDelete,
//   onEdit,
//   expenses,
// }: listExpenseProps) => {
//   if (loading) return <Loading />;
//   return (
//     <div className="w-full bg-gray-100 my-2">
//       <table className="text-black w-full">
//         <thead className="bg-gray-50 text-xs font-bold tracking-wider text-gray-700 text-start">
//           <tr>
//             <th scope="col" className="px-6 py-4 text-left">
//               Date
//             </th>
//             <th scope="col" className="px-6 py-4 text-left">
//               Numéro
//             </th>
//             <th scope="col" className="px-6 py-4 text-left">
//               Motif
//             </th>
//             <th scope="col" className="px-6 py-4 text-left">
//               Montant
//             </th>
//             <th scope="col" className="px-6 py-4 text-left">
//               Devise
//             </th>
//             <th scope="col" className="px-6 py-4 text-left">
//               Méthode de paiement
//             </th>
//             <th scope="col" className="px-6 py-4 text-left">
//               Réference
//             </th>
//             <th scope="col" className="px-6 py-4 text-center">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
//           {expenses.map((exp) => (
//             <tr
//               key={exp.id}
//               className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
//             >
//               <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
//                 <div className="flex items-center gap-2">
//                   <span>{exp.created_at}</span>
//                 </div>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2">
//                 <span className="font-medium">{exp.expense_number}</span>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2">
//                 <span className="font-medium">{exp.description}</span>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2 text-gray-900">
//                 <span className="font-semibold">{exp.amount}</span>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2">
//                 <span className="font-medium">{exp.currency}</span>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2">
//                 <span
//                   className={`font-medium rounded py-0.5 px-3 ${
//                     exp.payment_method === "bank"
//                       ? "bg-blue-200 text-blue-500"
//                       : exp.payment_method === "cash"
//                         ? "bg-purple-200 text-purple-500"
//                         : "bg-red-200 text-red-500"
//                   }`}
//                 >
//                   {exp.payment_method === "bank"
//                     ? "La banque"
//                     : exp.payment_method === "cash"
//                       ? "Cash"
//                       : "Mobile money"}
//                 </span>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2 text-center">
//                 <span className="font-medium">{exp.id}</span>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
//                 <button
//                   onClick={() => onEdit(exp)}
//                   className=" hover:bg-gray-100 cursor-pointer"
//                 >
//                   <Pencil size={16} />
//                 </button>

//                 <button
//                   onClick={() => onDelete(exp)}
//                   className=" text-red-600 hover:bg-red-50 cursor-pointer"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ListExpense;



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
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
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
        <table className="w-full min-w-[1000px] text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Numéro</th>
              <th className="px-5 py-3">Motif</th>
              <th className="px-5 py-3 text-right">Montant</th>
              <th className="px-5 py-3">Paiement</th>
              <th className="px-5 py-3">Référence</th>
              <th className="px-5 py-3 text-center">Actions</th>
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
                  <td className="whitespace-nowrap px-5 py-4">
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
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                      {exp.expense_number}
                    </span>
                  </td>

                  {/* Description */}
                  <td className="max-w-[280px] px-5 py-4">
                    <p
                      className="truncate text-xs font-medium text-gray-900"
                      title={exp.description}
                    >
                      {exp.description || "Sans description"}
                    </p>
                  </td>

                  {/* Amount */}
                  <td className="whitespace-nowrap px-5 py-4 text-right">
                    <span className="text-sm font-bold text-gray-900">
                      {formatAmount(exp.amount, exp.currency)}
                    </span>
                  </td>

                  {/* Payment method */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <div
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${payment.className}`}
                    >
                      <CreditCard size={12} />
                      {payment.label}
                    </div>
                  </td>

                  {/* Reference */}
                  <td className="px-5 py-4">
                    <span
                      className="block max-w-[150px] truncate font-mono text-[11px] text-gray-500"
                      title={exp.id}
                    >
                      {exp.id}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
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
      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50/70 px-5 py-3">
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

