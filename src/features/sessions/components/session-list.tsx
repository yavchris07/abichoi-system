import {
  Clock3,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

import type { Session } from "../../../utils/types";
import EmptyList from "../../../components/empty-list";
import Loading from "../../../components/loading";

type SessionProps = {
  isLoading: boolean;
  error: boolean;
  sessions: Session[];
  onDelete: (session: Session) => void;
};

const SessionList = ({
  error,
  isLoading,
  onDelete,
  sessions,
}: SessionProps) => {
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="my-3 rounded-2xl border border-red-100 bg-red-50 px-6 py-8 text-center">
        <p className="text-xs font-semibold text-red-700">
          Impossible de charger les sessions.
        </p>

        <p className="mt-1 text-[11px] text-red-500">
          Une erreur est survenue lors de la récupération des
          sessions actives.
        </p>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <EmptyList message="Aucune session ouverte pour le moment !" />
    );
  }

  return (
    <div className="my-3 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="border-b border-zinc-200 bg-zinc-50">
            <tr>
              <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Utilisateur
              </th>

              <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Contact
              </th>

              <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Session
              </th>

              <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Ouverture
              </th>

              <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Expiration
              </th>

              <th className="px-6 py-3.5 text-right text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {sessions.map((session) => {
              const initials = session.name
                ? session.name
                    .split(" ")
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()
                : "U";

              return (
                <tr
                  key={session.id}
                  className="group transition-colors hover:bg-zinc-50/70"
                >
                  {/* User */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">
                          {initials}
                        </div>

                        {/* Online indicator */}
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-zinc-900">
                          {session.name}
                        </p>

                        <div className="mt-0.5 flex items-center gap-1">
                          <ShieldCheck
                            size={11}
                            className="text-amber-500"
                          />

                          <span className="text-[10px] text-zinc-400">
                            Session active
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Mail
                          size={12}
                          className="text-zinc-400"
                        />

                        <span className="text-xs text-zinc-600">
                          {session.email}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Phone
                          size={12}
                          className="text-zinc-400"
                        />

                        <span className="text-[11px] text-zinc-400">
                          {session.phone}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Session */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                        <ShieldCheck size={15} />
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                          ID session
                        </p>

                        <p
                          title={session.id}
                          className="mt-0.5 font-mono text-[10px] text-zinc-600"
                        >
                          {session.id.length > 14
                            ? `${session.id.slice(0, 14)}...`
                            : session.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Start */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock3
                        size={14}
                        className="text-zinc-400"
                      />

                      <span className="text-xs font-medium text-zinc-700">
                        {session.start}
                      </span>
                    </div>
                  </td>

                  {/* End */}
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-xs font-medium text-zinc-700">
                        {session.end}
                      </span>

                      <p className="mt-0.5 text-[10px] text-zinc-400">
                        Expiration
                      </p>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => onDelete(session)}
                        title="Révoquer la session"
                        aria-label={`Révoquer la session de ${session.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <LogOut size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50/50 px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

          <span className="text-[11px] text-zinc-500">
            {sessions.length} session
            {sessions.length > 1 ? "s" : ""} active
            {sessions.length > 1 ? "s" : ""}
          </span>
        </div>

        <span className="text-[10px] text-zinc-400">
          Sessions en cours
        </span>
      </div>
    </div>
  );
};

export default SessionList;
