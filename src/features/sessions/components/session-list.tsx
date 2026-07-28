import { RouteOff } from "lucide-react";
import type { Session } from "../../../utils/types";
import EmptyList from "../../../components/empty-list";
import Loading from "../../../components/loading";

type sessionProps = {
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
}: sessionProps) => {
  if (isLoading) return <Loading />;

  if (sessions.length === 0)
    return <EmptyList message="Aucune session ouverte pour le moment !" />;

  if (error) return null;
  return (
    <div className="w-full bg-gray-100 my-2">
      <table className="text-black w-full">
        <thead className="bg-gray-50 text-xs font-bold tracking-wider text-gray-700 text-start">
          <tr>
            <th scope="col" className="px-6 py-4 text-left">
              Utilisateur
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Email
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Phone
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Jeton
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Date d&apos;ouverture
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Date d&apos;expiration
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
          {sessions.map((session) => (
            <tr
              key={session.id}
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-2">
                <div className="flex items-center gap-2">
                  <div className="bg-green-600 rounded-full w-2 h-2"></div>
                  <span className="text-sm font-medium">{session.name}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="text-sm font-medium">{session.email}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="text-sm font-medium">{session.phone}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="text-sm font-medium">
                  {session.token.substring(0, 17)}...
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="text-sm font-medium">
                  {session.start}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="text-sm font-medium">
                  {session.end}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
                <button
                  onClick={() => onDelete(session)}
                  className=" text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <RouteOff size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionList;
