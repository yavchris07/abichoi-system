import { Pencil, Trash2 } from "lucide-react";
import Loading from "../../../components/loading";
import type { Deposit } from "../../../utils/types";

interface listDepositProps {
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
}: listDepositProps) => {
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
              Source
            </th>
             <th scope="col" className="px-6 py-4 text-left">
              Réference
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
          {deposits.map((depo) => (
            <tr
              key={depo.id}
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{depo.created_at}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{depo.deposit_number}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{depo.description}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 text-gray-900">
                <span className="font-semibold">{depo.amount}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{depo.currency}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span
                  className={`font-medium rounded py-0.5 px-2 ${
                    depo.source === "bank"
                      ? "bg-blue-200 text-blue-500"
                      : depo.source === "owner"
                        ? "bg-green-200 text-green-500"
                        : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {depo.source === "bank"
                    ? "La banque"
                    : depo.source === "owner"
                      ? "Argent personnel"
                      : "Autre"}
                </span>
              </td>
               <td className="whitespace-nowrap px-6 py-2 text-center">
                <span className="font-medium">{depo.id}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(depo)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(depo)}
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

export default ListDeposit;
