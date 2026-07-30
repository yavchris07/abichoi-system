import MainLayout from "../components/main-layout";
import { useCashBalances } from "../features/cash-balances/hooks/use-cash-balances";
import { getToken } from "../utils/get-token";
import type { Balance } from "../utils/types";
// import type { Balance } from "../utils/types";

const DashboardPage = () => {
  const token = getToken();
  const { data: balances } = useCashBalances(token ?? '');
  console.log("CAISSE : ", balances);

  return (
    <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de bord / </span> bienvenu
        </h3>
      </div>
      <div className="flex gap-2">
        {balances.map((bal:Balance) => (
          <div className="border border-gray-100 py-10 px-6 shadow rounded">
            <div>
              Caisse {bal.currency === "USD" ? "Dollards" : "Francs congolais"}
            </div>
            <strong>
              {bal.balance} {bal.currency}
            </strong>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
