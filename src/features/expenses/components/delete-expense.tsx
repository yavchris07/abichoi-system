// import { Loader2 } from "lucide-react";
// import { useState } from "react";
// import { useToast } from "../../../components/customer-toast";
// import Modal from "../../../components/modal";
// import type { Expense } from "../../../utils/types";
// import { useDeleteExpense } from "../hooks/use-delete-expense";

// type deleteExpenseProps = {
//   open: string;
//   onClose: () => void;
//   expense: Expense;
//   token: string;
// };

// const DeleteExpense = ({
//   onClose,
//   open,
//   expense,
//   token,
// }: deleteExpenseProps) => {
//   const { deleteExpense, fail, pending } = useDeleteExpense(token ?? "");
//   const { showToast } = useToast();
//   const [formData, setFormData] = useState({ id: "" });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await deleteExpense(expense.id);
//       showToast("Suppression role reussie !", "success");
//       onClose();
//     } catch (e) {
//       if (e instanceof Error) {
//         console.log(e.message);
//         showToast(fail, "error");
//       } else {
//         console.log("error");
//         showToast(fail, "error");
//       }
//     }
//   };

//   if (open === null) return null;

//   return (
//     <Modal>
//       <div className="flex justify-between items-center my-2">
//         <h2 className="text-black font-semibold">Suppression depense</h2>
//         <span onClick={onClose} className="text-gray-600 cursor-pointer">
//           x
//         </span>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <p className="text-gray-500 text-sm">
//           Voulez-vous vraiment supprimer cette depense de
//           <strong className="text-black">{expense.beneficiary}</strong> ?
//         </p>

//         <input
//           type="text"
//           value={formData.id}
//           onChange={(e) => setFormData({ ...formData, id: e.target.value })}
//           placeholder="id"
//           className="hidden"
//         />

//         <div className="flex justify-end gap-2 my-2">
//           <span
//             className="hover:bg-gray-100 border border-gray-300 text-gray-900 text-xs py-2 px-6 rounded font-semibold cursor-pointer"
//             onClick={onClose}
//           >
//             Annuler
//           </span>
//           <button
//             type="submit"
//             className="bg-red-700 text-white text-xs py-2 px-6 rounded cursor-pointer font-semibold flex justify-center"
//             disabled={pending}
//           >
//             {pending ? (
//               <Loader2 className="animate-spin" size={14} />
//             ) : (
//               "Supprimer"
//             )}
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default DeleteExpense;


import {
  AlertTriangle,
  CalendarDays,
  CreditCard,
  Loader2,
  ReceiptText,
  Trash2,
  User,
  X,
} from "lucide-react";
import type { FormEvent } from "react";

import { useToast } from "../../../components/customer-toast";
import Modal from "../../../components/modal";
import type { Expense } from "../../../utils/types";
import { useDeleteExpense } from "../hooks/use-delete-expense";

type DeleteExpenseProps = {
  open: boolean;
  onClose: () => void;
  expense: Expense;
  token: string;
};

const DeleteExpense = ({
  onClose,
  open,
  expense,
  token,
}: DeleteExpenseProps) => {
  const { deleteExpense, fail, pending } = useDeleteExpense(token);
  const { showToast } = useToast();

  const formatAmount = (
    amount: number | string,
    currency: string,
  ) => {
    return `${Number(amount).toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} ${currency}`;
  };

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  const getPaymentMethod = (method: string) => {
    switch (method) {
      case "cash":
        return "Cash";

      case "bank":
        return "Banque";

      case "mobile_money":
      case "mobile money":
        return "Mobile Money";

      default:
        return method || "-";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await deleteExpense(expense.id);

      showToast(
        "Dépense supprimée avec succès.",
        "success",
      );

      onClose();
    } catch (error) {
      console.error("Erreur suppression dépense :", error);

      showToast(
        fail || "Impossible de supprimer cette dépense.",
        "error",
      );
    }
  };

  if (!open) return null;

  return (
    <Modal>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <Trash2 size={19} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-gray-900">
                Supprimer la dépense
              </h2>

              <p className="text-xs text-gray-500">
                Cette action nécessite une confirmation
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            aria-label="Fermer"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-6 py-5">
            {/* Warning */}
            <div className="flex gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
              <AlertTriangle
                size={18}
                className="mt-0.5 shrink-0 text-red-600"
              />

              <div>
                <p className="text-xs font-bold text-red-800">
                  Attention
                </p>

                <p className="mt-1 text-xs leading-5 text-red-700">
                  Vous êtes sur le point de supprimer cette
                  dépense. Cette opération peut avoir un impact
                  sur le journal financier.
                </p>
              </div>
            </div>

            {/* Expense identity */}
            <div className="rounded-xl border border-gray-200 bg-gray-50">
              <div className="border-b border-gray-200 px-4 py-3">
                <div className="flex items-center gap-2">
                  <ReceiptText
                    size={15}
                    className="text-amber-600"
                  />

                  <span className="text-xs font-bold text-gray-800">
                    Détails de la dépense
                  </span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {/* Beneficiary */}
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <div className="flex items-center gap-2 text-gray-500">
                    <User size={14} />

                    <span className="text-xs">
                      Bénéficiaire
                    </span>
                  </div>

                  <span className="text-right text-xs font-semibold text-gray-900">
                    {expense.beneficiary || "-"}
                  </span>
                </div>

                {/* Amount */}
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-xs text-gray-500">
                    Montant
                  </span>

                  <span className="text-sm font-bold text-gray-900">
                    {formatAmount(
                      expense.amount,
                      expense.currency,
                    )}
                  </span>
                </div>

                {/* Payment */}
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <div className="flex items-center gap-2 text-gray-500">
                    <CreditCard size={14} />

                    <span className="text-xs">
                      Paiement
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-gray-800">
                    {getPaymentMethod(expense.payment_method)}
                  </span>
                </div>

                {/* Date */}
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <div className="flex items-center gap-2 text-gray-500">
                    <CalendarDays size={14} />

                    <span className="text-xs">
                      Date
                    </span>
                  </div>

                  <span className="text-xs font-medium text-gray-800">
                    {formatDate(expense.created_at)}
                  </span>
                </div>

                {/* Expense number */}
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-xs text-gray-500">
                    Numéro
                  </span>

                  <span className="rounded-md bg-white px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                    {expense.expense_number || "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Confirmation message */}
            <p className="text-center text-xs text-gray-500">
              Voulez-vous vraiment supprimer cette dépense ?
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50/70 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={pending}
              className="flex min-w-[125px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
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
                  <Trash2 size={14} />
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

export default DeleteExpense;


