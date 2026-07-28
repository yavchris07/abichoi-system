import { Pencil, Trash2 } from "lucide-react";
import Loading from "../../../components/loading";
import type { CashMovement } from "../../../utils/types";

interface cashMovementsProps {
  cashMovements : CashMovement[];
  loading: boolean;
}
 
const ListCashMovement = ({cashMovements, loading}:cashMovementsProps) => {
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
              No piece
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Motif
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Beneficiaire
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Catégorie
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Numéro
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Type mouvement
            </th>
             <th scope="col" className="px-6 py-4 text-left">
              Solde
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
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{sm.piece_number}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{sm.description}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{sm.beneficiary}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{sm.voucher_number}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{sm.movement_type}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{sm.reference_type}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{sm.piece_number}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{sm.reference_id}</span>
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

 