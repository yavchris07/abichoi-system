import { Pencil, Trash2 } from "lucide-react";
import Loading from "../../../components/loading";
import type { Role } from "../../../utils/types";

interface roleProps {
  roles: Role[];
  loading: boolean;
  onDelete: (user: Role) => void;
  onEdit: (user: Role) => void;
}

const RoleList = ({ loading, onDelete, onEdit, roles }: roleProps) => {
  if (loading) return <Loading />;
  return (
    <div className="w-full bg-gray-100 my-2">
      <table className="text-black w-full">
        <thead className="bg-gray-50 text-xs font-bold tracking-wider text-gray-700 text-start">
          <tr>
            <th scope="col" className="px-6 py-4 text-left">
              ID
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Role
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
          {roles.map((role) => (
            <tr
              key={role.id}
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{role.id}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{role.name}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(role)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(role)}
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

export default RoleList;
