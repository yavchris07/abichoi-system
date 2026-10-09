import MainLayout from "../../components/main-layout";
import LogsList from "../../features/error-logs/components/logs-list";
import { useLogs } from "../../features/error-logs/hooks/use-logs";
import { getToken } from "../../utils/get-token";

const ErrorLogPage = () => {
  const token = getToken();
  const { data: logs, isLoading, isError } = useLogs(token ?? "");
  console.log("LOGS", logs);
  return (
    <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de board / </span> Logs
        </h3>
      </div>
      <LogsList error={isError} loading={isLoading} logs={logs} />
    </MainLayout>
  );
};

export default ErrorLogPage;
