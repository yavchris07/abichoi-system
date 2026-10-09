import { Send, SendHorizonal } from "lucide-react";
import Loading from "../../../components/loading";
import type { MailSend } from "../../../utils/types";

interface MailReceivedProps {
  mailSends: MailSend[];
  loading: boolean;
}

const ListMailReceived = ({loading,mailSends}:MailReceivedProps) => {
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

  if (!mailSends || mailSends.length === 0) {
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
            <h2 className="text-sm font-semibold text-gray-900">Courriels Entrant</h2>

            <p className="text-xs text-gray-500">
              Liste des courriels entrant
            </p>
          </div>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {mailSends.length} courriels entrant
          {mailSends.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-300 text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-3 py-2">N0 D'ordre</th>
              <th className="px-3 py-2">Date d'envoi</th>
              <th className="px-3 py-2">Destinateur / Organisme</th>
              <th className="px-3 py-2">Objet du courriel</th>
              <th className="px-3 py-2">Signature DG / Par interim</th>
              <th className="px-3 py-2">Mode expectif</th>
              <th className="px-3 py-2">N0 Decharge / preuve de depot</th>
              <th className="px-3 py-2">Copie archivee</th>
              <th className="px-3 py-2">Statut</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {mailSends.map((contrat) => {
              return (
                <tr
                  key={contrat.id}
                  className="transition-colors hover:bg-amber-50/30"
                >
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-700">
                        {contrat.ordre}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {contrat.send || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {contrat.organism || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {contrat.objet || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {formatDate(contrat.initial)}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {contrat.signature}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {contrat.mode || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {contrat.decharge || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {contrat.copy || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {contrat.statut || "-"}
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
          {mailSends.length} Courriels entrant
          {mailSends.length > 1 ? "s" : ""} affiché
          {mailSends.length > 1 ? "s" : ""}
        </span>

        <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <Send size={12} />
          Liste des courriels entrant
        </span>
      </div>
    </div>
  )
}

export default ListMailReceived


