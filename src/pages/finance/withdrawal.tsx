import { useState } from "react";
import MainLayout from "../../components/main-layout";
import { getToken } from "../../utils/get-token";
import type { Withdrawal } from "../../utils/types";
import { Plus } from "lucide-react";
import ListWithdrawals from "../../features/withdrawal/components/list-withdrawals";
import { useWithdrawals } from "../../features/withdrawal/hooks/use-withdrawals";
import CreateWithdrawal from "../../features/withdrawal/components/create-withdrawal";
import EditWithdrawal from "../../features/withdrawal/components/edit-withdrawal";
import DeleteWithdrawal from "../../features/withdrawal/components/delete-withdrwal";

const WithdrawalPage = () => {
  const token = getToken();
  const { data: withdrawals, isLoading } = useWithdrawals(token);

  const [modal, setModal] = useState<"edit" | "delete" | "open" | null>(null);
  const [selectedItem, setSelectedItem] = useState<Withdrawal | null>(null);

  const handleEdit = (withdrawal: Withdrawal) => {
    setSelectedItem(withdrawal);
    setModal("edit");
  };
  const handleDelete = (withdrawal: Withdrawal) => {
    setSelectedItem(withdrawal);
    setModal("delete");
  };
  return (
    <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de bord / </span> Retraits
        </h3>
        <span
          className="bg-amber-500 px-1 py-1 text-black text-xs font-semibold cursor-pointer rounded-full"
          onClick={() => setModal("open")}
        >
          <Plus size={17} />
        </span>
      </div>

      <ListWithdrawals
        withdrawals={withdrawals}
        loading={isLoading}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {modal === "open" && (
        <CreateWithdrawal
          onClose={() => setModal(null)}
          open={modal}
          token={token}
        />
      )}

      {modal === "edit" && selectedItem && (
        <EditWithdrawal
          withdrawal={selectedItem}
          onClose={() => setModal(null)}
          open={modal}
          token={token}
        />
      )}

      {modal === "delete" && selectedItem && (
        <DeleteWithdrawal
          withdrawal={selectedItem}
          onClose={() => setModal(null)}
          open={modal}
          token={token}
        />
      )}
    </MainLayout>
  );
};

export default WithdrawalPage;
