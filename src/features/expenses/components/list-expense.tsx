import { Pencil, Trash2 } from "lucide-react";
import Loading from "../../../components/loading";
import type { Expense } from "../../../utils/types";

interface listExpenseProps {
  expenses: Expense[];
  loading: boolean;
  onDelete: (user: Expense) => void;
  onEdit: (user: Expense) => void;
}

const ListExpense = ({
  loading,
  onDelete,
  onEdit,
  expenses,
}: listExpenseProps) => {
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
              Numero
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
              Methode de paiement
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
          {expenses.map((exp) => (
            <tr
              key={exp.id}
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{exp.created_at}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{exp.expense_number}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{exp.description}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{exp.amount}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{exp.currency}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{exp.payment_method}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(exp)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(exp)}
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

export default ListExpense;
