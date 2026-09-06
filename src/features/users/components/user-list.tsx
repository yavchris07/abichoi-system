// // import { User } from "@/utils/type";
// import { Eye, Pencil, Trash2 } from "lucide-react";
// import Loading from "../../../components/loading";
// import type { User } from "../../../utils/types";

// interface userProps {
//   users: User[];
//   loading: boolean;
//   onDelete: (user: User) => void;
//   onEdit: (user: User) => void;
//   onView: (user: User) => void;
// }

// const UsersList = ({ users, loading, onDelete, onEdit, onView }: userProps) => {
//   if (loading) return <Loading />;
//   return (
//     <div className="w-full bg-gray-100 my-2">
//       <table className="text-black w-full">
//         <thead className="bg-gray-50 text-xs font-bold tracking-wider text-gray-700 text-start">
//           <tr>
//             <th scope="col" className="px-6 py-4 text-left">
//               Matricule
//             </th>
//             <th scope="col" className="px-6 py-4 text-left">
//               Nom complet
//             </th>
//             <th scope="col" className="px-6 py-4 text-left">
//               Numéro ID
//             </th>
//             <th
//               scope="col"
//               className="px-6 py-4 max-w-xs text-left md:max-w-md"
//             >
//               Numéro de téléphone
//             </th>
//             <th
//               scope="col"
//               className="px-6 py-4 max-w-xs text-left md:max-w-md"
//             >
//               Email
//             </th>
//             <th
//               scope="col"
//               className="px-6 py-4 max-w-xs text-left md:max-w-md"
//             >
//               Adresse physique
//             </th>
//              <th
//               scope="col"
//               className="px-6 py-4 max-w-xs text-left md:max-w-md"
//             >
//               Role
//             </th>
//             <th
//               scope="col"
//               className="px-6 py-4 max-w-xs text-center md:max-w-md"
//             >
//               Etat
//             </th>
//             <th scope="col" className="px-6 py-4 text-center">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
//           {users.map((user) => (
//             <tr
//               key={user.id}
//               className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
//             >
//               <td className="whitespace-nowrap px-6 py-2">
//                 <span className="font-medium">{user.matricul}</span>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
//                 <div className="flex items-center gap-2">
//                   {/* <User2 className="h-4 w-4 text-gray-700 shrink-0" /> */}
//                   <span>{user.name}</span>
//                 </div>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2">
//                 <span className="font-medium">{user.nin}</span>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2">
//                 <span className="font-medium">{user.phone}</span>
//               </td>

//               <td className="whitespace-nowrap px-6 py-2">
//                 <span className="font-medium">{user.email}</span>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2">
//                 <span className="font-medium">{user.adress}</span>
//               </td>
//                <td className="whitespace-nowrap px-6 py-2">
//                 <span className="font-medium">{user.role}</span>
//               </td>

//               {/* Column 3: Comment (Truncated safely) */}
//               <td className="px-6 py-3 max-w-xs md:max-w-md">
//                 <p
//                   className={`truncate font-semibold py-1 px-1 rounded-2xl text-center ${user.is_active === 1 ? "text-green-700" : "text-red-700"}`}
//                 >
//                   {user.is_active === 1 ? "Actif" : "Désactivé"}
//                 </p>
//               </td>
//               <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
//                 {/* onView={} onEdit={} onDelete={} */}
//                 <button
//                   onClick={() => onView(user)}
//                   className=" hover:bg-gray-100 cursor-pointer"
//                 >
//                   <Eye size={16} />
//                 </button>
//                 <button
//                   onClick={() => onEdit(user)}
//                   className=" hover:bg-gray-100 cursor-pointer"
//                 >
//                   <Pencil size={16} />
//                 </button>

//                 <button
//                   onClick={() => onDelete(user)}
//                   className=" text-red-600 hover:bg-red-50 cursor-pointer"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UsersList;








import {
  Eye,
  Pencil,
  Trash2,
  UserRound,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

import Loading from "../../../components/loading";
import type { User } from "../../../utils/types";

interface UserProps {
  users: User[];
  loading: boolean;
  onDelete: (user: User) => void;
  onEdit: (user: User) => void;
  onView: (user: User) => void;
}

const UsersList = ({
  users,
  loading,
  onDelete,
  onEdit,
  onView,
}: UserProps) => {
  if (loading) {
    return (
      <div className="flex min-h-80 items-center justify-center rounded-2xl border border-zinc-200 bg-white">
        <Loading />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white px-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400">
          <UserRound size={22} />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-zinc-800">
          Aucun utilisateur
        </h3>

        <p className="mt-1 max-w-sm text-xs leading-5 text-zinc-400">
          Aucun utilisateur ne correspond aux critères actuels.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {/* Table header */}
      <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">
            Utilisateurs
          </h3>

          <p className="mt-0.5 text-xs text-zinc-400">
            {users.length} utilisateur{users.length > 1 ? "s" : ""} affiché
            {users.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="hidden items-center gap-2 text-xs text-zinc-400 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Gestion des comptes
        </div>
      </div>

      {/* Responsive table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1150px] text-left">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50/70">
              <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Utilisateur
              </th>

              <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Matricule
              </th>

              <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                N° ID
              </th>

              <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Contact
              </th>

              <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Adresse
              </th>

              <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Rôle
              </th>

              <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                État
              </th>

              <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {users.map((user) => {
              const isActive = user.is_active === 1;

              return (
                <tr
                  key={user.id}
                  className="group transition-colors hover:bg-zinc-50/70"
                >
                  {/* User */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
                        {getInitials(user.name)}
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-[180px] truncate text-sm font-medium text-zinc-900">
                          {user.name}
                        </p>

                        <div className="mt-0.5 flex items-center gap-1 text-xs text-zinc-400">
                          <Mail size={12} />
                          <span className="max-w-[180px] truncate">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Matricule */}
                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-zinc-100 px-2.5 py-1.5 font-mono text-xs font-medium text-zinc-700">
                      {user.matricul || "—"}
                    </span>
                  </td>

                  {/* NIN */}
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-zinc-600">
                      {user.nin || "—"}
                    </span>
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-xs text-zinc-600">
                      <Phone
                        size={14}
                        className="shrink-0 text-zinc-400"
                      />

                      <span>{user.phone || "—"}</span>
                    </div>
                  </td>

                  {/* Address */}
                  <td className="max-w-[180px] px-5 py-4">
                    <span
                      className="block truncate text-xs text-zinc-600"
                      title={user.adress}
                    >
                      {user.adress || "—"}
                    </span>
                  </td>

                  {/* Role */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                      <ShieldCheck size={12} />
                      {user.role || "Aucun rôle"}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isActive ? "bg-emerald-500" : "bg-red-500"
                        }`}
                      />

                      {isActive ? "Actif" : "Désactivé"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <ActionButton
                        label="Voir le profil"
                        onClick={() => onView(user)}
                        variant="default"
                      >
                        <Eye size={16} />
                      </ActionButton>

                      <ActionButton
                        label="Modifier"
                        onClick={() => onEdit(user)}
                        variant="default"
                      >
                        <Pencil size={16} />
                      </ActionButton>

                      <ActionButton
                        label="Supprimer"
                        onClick={() => onDelete(user)}
                        variant="danger"
                      >
                        <Trash2 size={16} />
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50/50 px-5 py-3">
        <p className="text-xs text-zinc-400">
          {users.length} résultat{users.length > 1 ? "s" : ""}
        </p>

        <p className="text-[11px] text-zinc-400">
          Les actions sont enregistrées dans les logs.
        </p>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Action button                                                              */
/* -------------------------------------------------------------------------- */

interface ActionButtonProps {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  variant: "default" | "danger";
}

const ActionButton = ({
  children,
  label,
  onClick,
  variant,
}: ActionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all ${
        variant === "danger"
          ? "border-transparent text-red-500 hover:border-red-100 hover:bg-red-50 hover:text-red-600"
          : "border-transparent text-zinc-400 hover:border-zinc-200 hover:bg-white hover:text-zinc-800"
      }`}
    >
      {children}
    </button>
  );
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const getInitials = (name?: string) => {
  if (!name) return "?";

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export default UsersList;

