import { Pencil, Trash2 } from "lucide-react";
import Loading from "../../../components/loading";
import type { CashMovement } from "../../../utils/types";

interface cashMovementsProps {
  cashMovements: CashMovement[];
  loading: boolean;
}

const ListCashMovement = ({ cashMovements, loading }: cashMovementsProps) => {
  if (loading) return <Loading />;
  return (
    <div className="w-full bg-gray-100 my-2">
      <table className="text-black w-full">
        <thead className="bg-gray-50 text-xs font-bold tracking-wider text-gray-700 text-start">
          <tr>
            <th scope="col" className="px-6 py-4 text-left">
              Date
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Numéro piece
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Motif
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Bénéficiaire
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Type mouvement
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Type de Réference
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Numéro de Réference
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Montant
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
          {cashMovements.map((sm) => (
            <tr
              key={sm.id}
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{sm.created_at}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium">
                <span>{sm.piece_number}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium  ">
                <span>{sm.description}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium">
                <span>{sm.beneficiary}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-center">
                <span
                  className={`rounded py-0.5 px-2 ${
                    sm.movement_type === "in"
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {sm.movement_type === "in" ? "Entrée" : "Sortie"}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium">
                <span>
                  {sm.reference_type === "deposit"
                    ? "Approvisionnement caisse"
                    : sm.reference_type === "withdrawal"
                      ? "Retrait"
                      : sm.reference_type === "expense"
                        ? "Dépense"
                        : "Vente"}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{sm.reference_id}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>
                    {sm.amount} {sm.currency}
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
                <button
                  //   onClick={() => onEdit(role)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Pencil size={16} />
                </button>

                <button
                  //   onClick={() => onDelete(role)}
                  className=" text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCashMovement;
