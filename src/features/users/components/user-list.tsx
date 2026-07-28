// import { User } from "@/utils/type";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Loading from "../../../components/loading";
import type { User } from "../../../utils/types";

interface userProps {
  users: User[];
  loading: boolean;
  onDelete: (user: User) => void;
  onEdit: (user: User) => void;
  onView: (user: User) => void;
}

const UsersList = ({ users, loading, onDelete, onEdit, onView }: userProps) => {
  if (loading) return <Loading />;
  return (
    <div className="w-full bg-gray-100 my-2">
      <table className="text-black w-full">
        <thead className="bg-gray-50 text-xs font-bold tracking-wider text-gray-700 text-start">
          <tr>
            <th scope="col" className="px-6 py-4 text-left">
              Matricule
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Nom complet
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Numéro ID
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Numéro de téléphone
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Adresse physique
            </th>
             <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-center md:max-w-md"
            >
              Etat
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{user.matricul}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  {/* <User2 className="h-4 w-4 text-gray-700 shrink-0" /> */}
                  <span>{user.name}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{user.nin}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{user.phone}</span>
              </td>

              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{user.email}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{user.adress}</span>
              </td>
               <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{user.role}</span>
              </td>

              {/* Column 3: Comment (Truncated safely) */}
              <td className="px-6 py-3 max-w-xs md:max-w-md">
                <p
                  className={`truncate font-semibold py-1 px-1 rounded-2xl text-center ${user.is_active === 1 ? "text-green-700" : "text-red-700"}`}
                >
                  {user.is_active === 1 ? "Actif" : "Désactivé"}
                </p>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
                {/* onView={} onEdit={} onDelete={} */}
                <button
                  onClick={() => onView(user)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => onEdit(user)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(user)}
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

export default UsersList;
