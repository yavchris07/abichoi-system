import { Send, SendHorizonal } from "lucide-react";
import Loading from "../../../components/loading";
import type { MailReceived } from "../../../utils/types";

interface MailReceivedProps {
  mailReceived: MailReceived[];
  loading: boolean;
}

const ListMailReceived = ({ loading, mailReceived }: MailReceivedProps) => {
  if (loading) {
    return <Loading />;
  }

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  if (!mailReceived || mailReceived.length === 0) {
    return (
      <div className="my-2 flex w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-14">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <SendHorizonal size={22} />
        </div>

        <p className="text-sm font-semibold text-gray-800">
          Aucun courriel entrant n'est enregistré pour le moment.
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Les courriels apparaîtront ici.
        </p>
      </div>
    );
  }
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
            <Send size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Courriels Entrant
            </h2>

            <p className="text-xs text-gray-500">Liste des courriels entrant</p>
          </div>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {mailReceived.length} courriels entrant
          {mailReceived.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-300 text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-3 py-2">N0 D'ordre</th>
              <th className="px-3 py-2">Date D'arrivee</th>
              <th className="px-3 py-2">Date du courriel</th>
              <th className="px-3 py-2">Expediteur / Organisme</th>
              <th className="px-3 py-2">Objet du courriel</th>
              <th className="px-3 py-2">Type de document</th>
              <th className="px-3 py-2">Direction / Service destinateur</th>
              <th className="px-3 py-2">Action / preuve de depot</th>
              <th className="px-3 py-2">Date de transmission</th>
              <th className="px-3 py-2">Emplacement</th>
              <th className="px-3 py-2">Statut</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {mailReceived.map((received) => {
              return (
                <tr
                  key={received.id}
                  className="transition-colors hover:bg-amber-50/30"
                >
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-700">
                        {received.ordre}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {formatDate(received.arrived) || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {formatDate(received.mail) || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {received.organism || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {received.objet}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {received.document}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {received.direction || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {received.action || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {formatDate(received.transmission) || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {received.emplacement || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {received.statut || "-"}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50/70 px-3 py-2">
        <span className="text-xs text-gray-500">
          {mailReceived.length} Courriels entrant
          {mailReceived.length > 1 ? "s" : ""} affiché
          {mailReceived.length > 1 ? "s" : ""}
        </span>

        <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <Send size={12} />
          Liste des courriels entrant
        </span>
      </div>
    </div>
  );
};

export default ListMailReceived;
