import { MailOpen } from "lucide-react";
import Loading from "../../../components/loading";
import type { ContratRegister } from "../../../utils/types";

interface ContratRegisterProps {
  contratRegister: ContratRegister[];
  loading: boolean;
}

const ListContrat = ({ contratRegister, loading }: ContratRegisterProps) => {
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

  if (!contratRegister || contratRegister.length === 0) {
    return (
      <div className="my-2 flex w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-14">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <MailOpen size={22} />
        </div>

        <p className="text-sm font-semibold text-gray-800">
          Aucun contrat n'est enregistré pour le moment.
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Les contrats apparaîtront ici.
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
            <MailOpen size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-900">Contrats</h2>

            <p className="text-xs text-gray-500">
              Liste des contrats enregistrés
            </p>
          </div>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {contratRegister.length} contrat
          {contratRegister.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-300 text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-3 py-2">N0 Ref</th>
              <th className="px-3 py-2">Intitulé</th>
              <th className="px-3 py-2">Cocontratat</th>
              <th className="px-3 py-2">Réference</th>
              <th className="px-3 py-2">Date signature</th>
              <th className="px-3 py-2">Date echeance</th>
              <th className="px-3 py-2">Mode expectif</th>
              <th className="px-3 py-2">Delai</th>
              <th className="px-3 py-2">Responsable</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {contratRegister.map((contrat) => {
              return (
                <tr
                  key={contrat.id}
                  className="transition-colors hover:bg-amber-50/30"
                >
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-700">
                        {contrat.ref}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {contrat.institule || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {contrat.cocontrat || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {contrat.reference || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {formatDate(contrat.date_signature)}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {formatDate(contrat.date_echeance)}
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
                        {contrat.delai || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-medium text-gray-700">
                        {contrat.responsable || "-"}
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
          {contratRegister.length} contrat
          {contratRegister.length > 1 ? "s" : ""} affiché
          {contratRegister.length > 1 ? "s" : ""}
        </span>

        <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <MailOpen size={12} />
          Liste des contrats
        </span>
      </div>
    </div>
  );
};

export default ListContrat;
