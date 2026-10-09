import Loading from "../../../components/loading";
import type { Audit } from "../../../utils/types";

type auditLogProps = {
  logs: Audit[];
  loading: boolean;
  error: boolean;
};

const ErrorLogsList = ({ error, loading, logs }: auditLogProps) => {
  if (loading) return <Loading />;
  if (error) return <p>Error pending</p>;
  return (
    <div className="w-full bg-gray-100 my-2">
      <table className="text-black w-full">
        <thead className="bg-gray-50 text-xs font-bold tracking-wider text-gray-700 text-start">
          <tr>
            <th scope="col" className="px-6 py-4 text-left">
              Date
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              User
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Action
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Old value
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              New values
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Adresse IP
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Device
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
          {logs.map((log) => (
            <tr
              key={log.id}
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{log.created_at}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{log.user_id}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium  ">
                <span>{log.action}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium">
                <span>{log.old_values}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{log.new_values}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{log.ip_address}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{log.user_agent.substring(0, 50)}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ErrorLogsList;
