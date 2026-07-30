import MainLayout from "../../components/main-layout";
import ListCashMovement from "../../features/cash-movements/components/list-cash-movement";
import { useCashMovements } from "../../features/cash-movements/hooks/use-cash-movements";
import { getToken } from "../../utils/get-token";

const CashMovementPage = () => {
  const token = getToken();
  const { data: movements, isLoading } = useCashMovements(token ?? "");

  console.log('EEEEE ', movements)
  return (
    <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de bord / </span> Journal de
          caisse
        </h3>
      </div>
      <ListCashMovement cashMovements={movements} loading={isLoading} />
    </MainLayout>
  );
};

export default CashMovementPage;
