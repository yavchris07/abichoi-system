// import { Pencil, Trash2 } from "lucide-react";
// import Loading from "../../../components/loading";
// import type { CashMovement } from "../../../utils/types";

// interface cashMovementsProps {
//   cashMovements: CashMovement[];
//   loading: boolean;
//   role: string;
// }

// const ListCashMovement = ({
//   cashMovements,
//   loading,
//   role,
// }: cashMovementsProps) => {
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
//               Numéro piece
//             </th>
//             <th scope="col" className="px-6 py-4 text-left">
//               Motif
//             </th>
//             <th scope="col" className="px-6 py-4 text-left">
//               Bénéficiaire
//             </th>
//             <th scope="col" className="px-6 py-4 text-left">
//               Type mouvement
//             </th>
//             <th scope="col" className="px-6 py-4 text-left">
//               Type de Réference
//             </th>
//             <th scope="col" className="px-6 py-4 text-left">
//               Numéro de Réference
//             </th>
//             <th scope="col" className="px-6 py-4 text-left">
//               Montant
//             </th>
//             {role === "cfo" ? (
//               <th scope="col" className="px-6 py-4 text-center">
//                 Actions
//               </th>
//             ) : null}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
//           {cashMovements.map((sm) => (
//             <tr
//               key={sm.id}
//               className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
//             >
//               <td className="whitespace-nowrap px-6 py-2">
//                 <span className="font-medium">{sm.created_at}</span>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2 font-medium">
//                 <span>{sm.piece_number}</span>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2 font-medium  ">
//                 <span>{sm.description}</span>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2 font-medium">
//                 <span>{sm.beneficiary}</span>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2 font-medium text-center">
//                 <span
//                   className={`rounded py-0.5 px-2 ${
//                     sm.movement_type === "in"
//                       ? "bg-green-200 text-green-700"
//                       : "bg-red-200 text-red-700"
//                   }`}
//                 >
//                   {sm.movement_type === "in" ? "Entrée" : "Sortie"}
//                 </span>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2 font-medium">
//                 <span>
//                   {sm.reference_type === "deposit"
//                     ? "Approvisionnement caisse"
//                     : sm.reference_type === "withdrawal"
//                       ? "Retrait"
//                       : sm.reference_type === "expense"
//                         ? "Dépense"
//                         : "Vente"}
//                 </span>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
//                 <div className="flex items-center gap-2">
//                   <span>{sm.reference_id}</span>
//                 </div>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
//                 <div className="flex items-center gap-2">
//                   <span>
//                     {sm.amount} {sm.currency}
//                   </span>
//                 </div>
//               </td>
//               {role === "cfo" ? (
//                 <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
//                   <button
//                     //   onClick={() => onEdit(role)}
//                     className=" hover:bg-gray-100 cursor-pointer"
//                   >
//                     <Pencil size={16} />
//                   </button>

//                   <button
//                     //   onClick={() => onDelete(role)}
//                     className=" text-red-600 hover:bg-red-50 cursor-pointer"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </td>
//               ) : null}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ListCashMovement;

import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  CircleDollarSign,
  FileText,
  ReceiptText,
} from "lucide-react";

import Loading from "../../../components/loading";
import type { CashMovement } from "../../../utils/types";

interface CashMovementsProps {
  cashMovements: CashMovement[];
  loading: boolean;
  role: string;
}

const ListCashMovement = ({
  cashMovements,
  loading,
  role,
}: CashMovementsProps) => {
  if (loading) {
    return <Loading />;
  }

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  const formatAmount = (
    amount: number | string,
    currency: string,
  ) => {
    return `${Number(amount).toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} ${currency}`;
  };

  const getReferenceType = (type: string) => {
    switch (type) {
      case "deposit":
        return {
          label: "Approvisionnement",
          className:
            "bg-blue-50 text-blue-700 border-blue-100",
        };

      case "withdrawal":
        return {
          label: "Retrait",
          className:
            "bg-purple-50 text-purple-700 border-purple-100",
        };

      case "expense":
        return {
          label: "Dépense",
          className:
            "bg-red-50 text-red-700 border-red-100",
        };

      case "sale":
        return {
          label: "Vente",
          className:
            "bg-green-50 text-green-700 border-green-100",
        };

      default:
        return {
          label: type || "Autre",
          className:
            "bg-gray-50 text-gray-600 border-gray-100",
        };
    }
  };

  if (!cashMovements || cashMovements.length === 0) {
    return (
      <div className="my-2 flex w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-14">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <CircleDollarSign size={22} />
        </div>

        <p className="text-sm font-semibold text-gray-800">
          Aucun mouvement financier
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Les entrées et sorties de trésorerie apparaîtront ici.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
            <CircleDollarSign size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Mouvements de caisse
            </h2>

            <p className="text-xs text-gray-500">
              Journal des entrées et sorties financières
            </p>
          </div>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {cashMovements.length} mouvement
          {cashMovements.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-300 text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Pièce</th>
              <th className="px-3 py-2">Motif</th>
              <th className="px-3 py-2">Bénéficiaire</th>
              <th className="px-3 py-2 text-center">
                Mouvement
              </th>
              <th className="px-3 py-2">Origine</th>
              <th className="px-3 py-2">Référence</th>
              <th className="px-3 py-2 text-right">
                Montant
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {cashMovements.map((movement) => {
              const reference = getReferenceType(
                movement.reference_type,
              );

              const isIncoming =
                movement.movement_type === "in";

              return (
                <tr
                  key={movement.id}
                  className="transition-colors hover:bg-amber-50/30"
                >
                  {/* Date */}
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <CalendarDays
                        size={14}
                        className="text-gray-400"
                      />

                      <span className="text-xs font-medium text-gray-700">
                        {formatDate(movement.created_at)}
                      </span>
                    </div>
                  </td>

                  {/* Piece */}
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <FileText
                        size={14}
                        className="text-gray-400"
                      />

                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {movement.piece_number || "-"}
                      </span>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="max-w-62.5 px-3 py-2">
                    <p
                      title={movement.description}
                      className="truncate text-xs font-medium text-gray-900"
                    >
                      {movement.description || "Sans description"}
                    </p>
                  </td>

                  {/* Beneficiary */}
                  <td className="max-w-45 px-3 py-2">
                    <p
                      title={movement.beneficiary}
                      className="truncate text-xs text-gray-700"
                    >
                      {movement.beneficiary || "-"}
                    </p>
                  </td>

                  {/* Movement type */}
                  <td className="whitespace-nowrap px-3 py-2 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                        isIncoming
                          ? "border-green-100 bg-green-50 text-green-700"
                          : "border-red-100 bg-red-50 text-red-700"
                      }`}
                    >
                      {isIncoming ? (
                        <ArrowDownLeft size={12} />
                      ) : (
                        <ArrowUpRight size={12} />
                      )}

                      {isIncoming ? "Entrée" : "Sortie"}
                    </span>
                  </td>

                  {/* Reference type */}
                  <td className="whitespace-nowrap px-3 py-2">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${reference.className}`}
                    >
                      {reference.label}
                    </span>
                  </td>

                  {/* Reference ID */}
                  <td className="px-3 py-2">
                    <span
                      title={String(movement.reference_id)}
                      className="block max-w-42.5 truncate font-mono text-[11px] text-gray-500"
                    >
                      {movement.reference_id || "-"}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="whitespace-nowrap px-3 py-2 text-right">
                    <div
                      className={`flex items-center justify-end gap-1.5 text-sm font-bold ${
                        isIncoming
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {isIncoming ? "+" : "-"}
                      {formatAmount(
                        movement.amount,
                        movement.currency,
                      )}
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
          {cashMovements.length} mouvement
          {cashMovements.length > 1 ? "s" : ""} affiché
          {cashMovements.length > 1 ? "s" : ""}
        </span>

        <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <ReceiptText size={12} />
          Journal financier
        </span>
      </div>
    </div>
  );
};

export default ListCashMovement;

