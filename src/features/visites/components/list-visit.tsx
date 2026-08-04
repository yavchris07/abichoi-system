import { Eye } from "lucide-react";
import Loading from "../../../components/loading";
import type { Visitor } from "../../../utils/types";

interface visitorProps {
  visitors: Visitor[];
  loading: boolean;
  onView: (visitors: Visitor) => void;
}

const ListVisit = ({ loading, onView, visitors }: visitorProps) => {
  if (loading) return <Loading />;
  return (
    <div className="w-full bg-gray-100 my-2">
      <table className="text-black w-full">
        <thead className="bg-gray-50 text-xs font-bold tracking-wider text-gray-700 text-start">
          <tr>
            <th scope="col" className="px-6 py-4 text-left">
              Date / heure
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Nom visiteurs
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Occupation
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Motif
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Hote
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
          {visitors.map((visitor) => (
            <tr
              key={visitor.id}
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{visitor.hour}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  {/* <User2 className="h-4 w-4 text-gray-700 shrink-0" /> */}
                  <span>{visitor.visitor}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{visitor.work}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{visitor.motif}</span>
              </td>

              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{visitor.user}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{visitor.statut}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
                {/* onView={} onEdit={} onDelete={} */}
                <button
                  onClick={() => onView(visitor)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Eye size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListVisit





// cash_movements
// ---------------
// id
// shop_id
// date
// voucher_number      -- numéro de pièce
// reason              -- motif
// beneficiary
// category_id
// document_number     -- bon d'entrée/sortie
// direction           -- in | out
// amount
// reference_type
// reference_id
// created_by
// created_at