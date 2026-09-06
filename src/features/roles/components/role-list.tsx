import {
  Pencil,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import Loading from "../../../components/loading";
import type { Role } from "../../../utils/types";

interface RoleProps {
  roles: Role[];
  loading: boolean;
  onDelete: (role: Role) => void;
  onEdit: (role: Role) => void;
}

const RoleList = ({
  loading,
  onDelete,
  onEdit,
  roles,
}: RoleProps) => {
  if (loading) {
    return <Loading />;
  }

  if (!roles.length) {
    return (
      <div className="my-3 flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white px-6 py-14 text-center">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <ShieldCheck size={20} />
        </div>

        <h3 className="text-sm font-semibold text-zinc-900">
          Aucun rôle trouvé
        </h3>

        <p className="mt-1 max-w-sm text-xs text-zinc-400">
          Aucun rôle n'est actuellement disponible dans le
          système.
        </p>
      </div>
    );
  }

  return (
    <div className="my-3 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-125 text-left text-sm text-zinc-600">
          <thead className="border-b border-zinc-200 bg-zinc-50">
            <tr>
              <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                ID
              </th>

              <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Rôle
              </th>

              <th className="px-6 py-3.5 text-right text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {roles.map((role) => (
              <tr
                key={role.id}
                className="group transition-colors hover:bg-zinc-50/70"
              >
                {/* ID */}
                <td className="px-6 py-4">
                  <span
                    title={role.id}
                    className="font-mono text-[11px] text-zinc-400"
                  >
                    {role.id.length > 18
                      ? `${role.id.slice(0, 18)}...`
                      : role.id}
                  </span>
                </td>

                {/* Role */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                      <ShieldCheck size={17} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-zinc-900">
                        {role.name}
                      </p>

                      <p className="mt-0.5 text-[10px] text-zinc-400">
                        Rôle système
                      </p>
                    </div>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(role)}
                      title="Modifier le rôle"
                      aria-label={`Modifier ${role.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-amber-50 hover:text-amber-600"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(role)}
                      title="Supprimer le rôle"
                      aria-label={`Supprimer ${role.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50/50 px-6 py-3">
        <p className="text-[11px] text-zinc-400">
          {roles.length} rôle{roles.length > 1 ? "s" : ""}{" "}
          enregistré{roles.length > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

export default RoleList;
