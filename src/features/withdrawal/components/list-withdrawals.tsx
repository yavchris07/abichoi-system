import { Pencil, Trash2 } from "lucide-react";
import Loading from "../../../components/loading";
import type { Withdrawal } from "../../../utils/types";

interface listWithdrawalProps {
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
}: listWithdrawalProps) => {
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
              Numéro
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Motif
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Montant
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Devise
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Bénéficiaire
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
          {withdrawals.map((withdrawal) => (
            <tr
              key={withdrawal.id}
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{withdrawal.created_at}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">
                  {withdrawal.withdrawal_number}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{withdrawal.reason}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 text-gray-900">
                <span className="font-semibold">{withdrawal.amount}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{withdrawal.currency}</span>
              </td>

              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{withdrawal.beneficiary}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2">
                <button
                  onClick={() => onEdit(withdrawal)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(withdrawal)}
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

export default ListWithdrawals;
