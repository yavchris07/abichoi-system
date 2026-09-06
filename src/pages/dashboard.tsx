import MainLayout from "../components/main-layout";
import { useCashBalances } from "../features/cash-balances/hooks/use-cash-balances";
import { getCurrentUser } from "../utils/get-current-user";
import { getToken } from "../utils/get-token";
import type { Balance } from "../utils/types";
import AdminDashboard from "./admin/admin-dashboard";
import DirectionDashboard from "./dg/dg-dashboard";
import FinanceDashboard from "./finance/finance-dashboard";
import RHDashboard from "./rh/rh-dashboard";
// import type { Balance } from "../utils/types";

const DashboardPage = () => {
  const token = getToken();
  const user = getCurrentUser();
  const { data: balances, isLoading } = useCashBalances(token ?? "");

  const sold: Balance[] =
    balances?.filter((bal: Balance) => bal.balance > 0) || [];
  console.log("CAISSE : ", sold);

  console.log("USER : ", user);

  return (
    <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de bord / </span> bienvenu
        </h3>
      </div>

      <div className="flex gap-2">
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          sold.map((bal: Balance) => (
            <div
              className="border border-gray-100 py-10 px-6 shadow rounded"
              key={bal.id}
            >
              <div>
                Caisse{" "}
                {bal.currency === "USD" ? "Dollards" : "Francs congolais"}
              </div>
              <strong>
                {bal.balance} {bal.currency}
              </strong>
            </div>
          ))
        )}
      </div>
      {user?.role === "super" && <AdminDashboard />}
      {user?.role === "cfo" && <FinanceDashboard />}
      {user?.role === "dg" && <DirectionDashboard token="" />}
      {user?.role === "rh" && <RHDashboard token="" />}
    </MainLayout>
  );
};

export default DashboardPage;
