import MainLayout from "../../components/main-layout";
import SessionList from "../../features/sessions/components/session-list";
import { useSessions } from "../../features/sessions/hooks/use-sessions";
import { getToken } from "../../utils/get-token";

const SessionPage = () => {
  const token = getToken();
  const { data: sessions, isLoading, isError } = useSessions(token ?? "");

  const handleRevoke = () => {};

  // console.log('SESSION : ', sessions)
  return (
    <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de board / </span> Sessions
          utilisateurs
        </h3>
      </div>

      <SessionList
        error={isError}
        isLoading={isLoading}
        onDelete={handleRevoke}
        sessions={sessions}
      />
    </MainLayout>
  );
};

export default SessionPage;
